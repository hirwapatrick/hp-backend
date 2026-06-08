import Groq from 'groq-sdk';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Testimonial from '../models/Testimonial.js';
import SiteSetting from '../models/SiteSetting.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const buildSystemPrompt = (data) => {
  const { settings, projects, skills, experiences, testimonials } = data;

  return `You are HP, an AI assistant for Hirwa Patrick's portfolio. You are helpful, knowledgeable, and enthusiastic about showcasing his work.

ABOUT HIRWA PATRICK:
Name: ${settings.name || 'Hirwa Patrick'}
Role: ${settings.role || 'Full Stack Developer'}
Location: ${settings.location || 'Kigali, Rwanda'}
Email: ${settings.email || 'patrick@hirwa.dev'}
Phone: ${settings.phone || '+250 788 000 000'}
Bio: ${settings.bio || ''}
${settings.longBio ? `Long Bio: ${settings.longBio}` : ''}

Social Links:
- GitHub: ${settings.github || 'https://github.com/patrickhirwa'}
- LinkedIn: ${settings.linkedin || 'https://linkedin.com/in/patrickhirwa'}
- Twitter: ${settings.twitter || 'https://twitter.com/patrickhirwa'}
${settings.resumeUrl ? `- Resume: ${settings.resumeUrl}` : ''}

SKILLS:
${skills.map((cat) => `${cat.title} (${cat.categoryKey}):\n${cat.skills.map((s) => `  - ${s.name}: ${s.level}% proficiency`).join('\n')}`).join('\n\n')}

PROJECTS:
${projects.map((p) => `- ${p.title} (${p.category})\n  Description: ${p.description}\n  Technologies: ${Array.isArray(p.technologies) ? p.technologies.join(', ') : ''}${p.repoUrl ? `\n  Repo: ${p.repoUrl}` : ''}${p.liveUrl ? `\n  Live: ${p.liveUrl}` : ''}`).join('\n\n')}

EXPERIENCE:
${experiences.map((e) => `- ${e.title} at ${e.company || e.type} (${e.period})\n  Location: ${e.location || 'N/A'}\n  Description: ${e.description}${e.highlights && e.highlights.length ? `\n  Highlights:\n  ${e.highlights.map((h) => `    - ${h}`).join('\n  ')}` : ''}`).join('\n\n')}

TESTIMONIALS:
${testimonials.map((t) => `- ${t.name} (${t.role || 'N/A'}): "${t.content}" - Rating: ${t.rating}/5`).join('\n')}

INSTRUCTIONS:
1. Answer questions about Hirwa Patrick's skills, projects, experience, and background.
2. Be conversational, friendly, and professional.
3. If asked about contact, provide his email and social links.
4. Keep responses concise and informative.
5. If you don't know something, say so honestly.
6. You can discuss technical topics and give opinions on web development.
7. When mentioning projects, feel free to suggest the visitor check them out.`;
};

export const chat = async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    const [settingsArr, projects, skills, experiences, testimonials] = await Promise.all([
      SiteSetting.find(),
      Project.find().sort({ order: 1 }),
      Skill.find().sort({ order: 1 }),
      Experience.find().sort({ order: 1 }),
      Testimonial.find().sort({ order: 1 }),
    ]);

    const settings = {};
    settingsArr.forEach((s) => { settings[s.key] = s.value; });

    const systemPrompt = buildSystemPrompt({ settings, projects, skills, experiences, testimonials });

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []),
      { role: 'user', content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    res.json({ reply: completion.choices[0]?.message?.content || '' });
  } catch (error) {
    console.error('Assistant error:', error);
    res.status(500).json({ message: 'Failed to get response from assistant' });
  }
};
