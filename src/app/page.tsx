import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Logo and Brand */}
      <div className="flex items-center px-6 py-4">
        <Image 
          src="/PopomoLogo.png" 
          alt="Popomo Logo" 
          width={32}
          height={32}
          className="mr-3"
        />
        <span className="text-2xl font-bold text-gray-900">Popomo</span>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Make sticker-puppet videos by coding like Scratch. No timelines. No keyframes.
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Perfect for teachers and kid creators. Move characters with blocks, hit &quot;Play,&quot; export a lesson in minutes.
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScA3ILbcqbZiymU8CX0Vem579nE62BZzLq33qs4SBNJNgn36A/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            For K-2 Teachers → Get early access
          </a>
        </header>

        {/* What You Can Make */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🌟 What You Can Make</h2>
          <p className="text-lg text-gray-700 mb-8">
            Outcomes that this tool wants to achieve without you learning complicated animation studio software:
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/10pRIqrY9dY"
                  title="PokéRhyme Example"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">PokéRhyme Style</h3>
              <p className="text-gray-600">Character-driven stories with expressive movements</p>
            </div>
            
            <div>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Z2F6OKQu4JI"
                  title="LaDaDee Example"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">LaDaDee Style</h3>
              <p className="text-gray-600">Playful puppet show animations with charm</p>
            </div>
          </div>
        </section>

        {/* Why Popomo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">✨ Why Popomo</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Tell a story, don&apos;t rig/animate.</h3>
              <p className="text-gray-600">Use blocks like On Start → Wait → Cue → Move → Tilt to perform scenes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Handmade charm.</h3>
              <p className="text-gray-600">Digital puppet show vibes — cute, expressive, and fast.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Learn programming.</h3>
              <p className="text-gray-600">Scratch-like visual blocks teach coding concepts while creating.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Shorts ready.</h3>
              <p className="text-gray-600">Export 16:9, 1:1, 9:16 for YouTube/TikTok/classroom.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎥 How It Works</h2>
          <ol className="space-y-4">
            <li className="flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</span>
              <span><strong>Add Stickers</strong> (characters, props, emotions, effects)</span>
            </li>
            <li className="flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</span>
              <span><strong>Program Cues</strong> (On Start, On Cue, Move, Tilt, Swap)</span>
            </li>
            <li className="flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</span>
              <span><strong>Hit Play</strong> — your puppets perform the story</span>
            </li>
            <li className="flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">4</span>
              <span><strong>Export</strong> — share your short in minutes</span>
            </li>
          </ol>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔍 Where Popomo Fits</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Tool</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Core Idea</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">For Who</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Problem</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Canva</td>
                  <td className="px-6 py-4 text-gray-600">Premade effects + hand-drag path</td>
                  <td className="px-6 py-4 text-gray-600">Social creators</td>
                  <td className="px-6 py-4 text-gray-600">Generic motion, weak timing control</td>
                  <td className="px-6 py-4 text-red-600 font-medium">Too weak</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Adobe Animate / Moho</td>
                  <td className="px-6 py-4 text-gray-600">Rig/keyframe workflows</td>
                  <td className="px-6 py-4 text-gray-600">Pro animators</td>
                  <td className="px-6 py-4 text-gray-600">Steep learning curve; heavy timelines</td>
                  <td className="px-6 py-4 text-red-600 font-medium">Too hard</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">CapCut</td>
                  <td className="px-6 py-4 text-gray-600">General video editing</td>
                  <td className="px-6 py-4 text-gray-600">Editors/influencers</td>
                  <td className="px-6 py-4 text-gray-600">Clip editing, not stage performance</td>
                  <td className="px-6 py-4 text-red-600 font-medium">Not fit</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-6 py-4 font-bold">Popomo</td>
                  <td className="px-6 py-4 text-gray-900">Programmable sticker motion</td>
                  <td className="px-6 py-4 text-gray-900">Storytellers, teachers, indie creators</td>
                  <td className="px-6 py-4 text-gray-900">Simple blocks with expressive results</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Just right</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-lg font-medium text-gray-900 mt-6">
            You don&apos;t edit videos — you perform them.
          </p>
        </section>

        {/* Coming Soon */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🧩 Coming Soon</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Stage editor</li>
            <li>• Stage preview</li>
            <li>• Export as MP4</li>
            <li>• Scene templates (forest, village, wait, do you actually want a dungeon?)</li>
            <li>• Cloud saves + collaboration</li>
            <li>• AI vibe coding</li>
          </ul>
        </section>

        {/* Who It's For */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💬 Who It&apos;s For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Kids & Teachers:</h3>
              <p className="text-gray-600">where code meets creativity</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">YouTubers:</h3>
              <p className="text-gray-600">fast stories without studios</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Animators:</h3>
              <p className="text-gray-600">prototype scenes before heavy tools</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Marketers:</h3>
              <p className="text-gray-600">charming explainers in minutes</p>
            </div>
          </div>
        </section>

        {/* Mini-FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">❓ Mini-FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Do I need animation skills?</h3>
              <p className="text-gray-600">No. You&apos;ll use simple blocks and cues.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Can I use my own art?</h3>
              <p className="text-gray-600">Yes — drop in PNGs as stickers.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Will it be expensive?</h3>
              <p className="text-gray-600">It&apos;s totally free and open source. We offer premium assets, but you can totally use your own assets.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">❤️ Join the Early Crew</h2>
          <p className="text-xl mb-8">Help shape Popomo from day one. Get invites, sneak peeks, and a founder thank-you.</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScA3ILbcqbZiymU8CX0Vem579nE62BZzLq33qs4SBNJNgn36A/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Join the Waitlist →
          </a>
          <p className="text-lg font-medium mt-8 opacity-90">
            Tagline: <em>Sticker motion. Story emotion.</em>
          </p>
        </section>
      </div>
    </div>
  );
}
