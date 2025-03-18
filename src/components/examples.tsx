import React, { useState } from "react";
import Header from "./StoryGenerator/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Copy, Download } from "lucide-react";

const exampleStories = [
  {
    id: "1",
    title: "The Crystal Cavern",
    genre: "Fantasy",
    tone: "Mysterious",
    preview:
      "Deep within the Enchanted Forest, a hidden cavern of crystals held secrets beyond imagination. When young Elara discovered a map in her grandmother's attic...",
    content:
      "The Crystal Cavern\n\nDeep within the Enchanted Forest, a hidden cavern of crystals held secrets beyond imagination. When young Elara discovered a map in her grandmother's attic, she never expected it would lead to the adventure of a lifetime.\n\nThe parchment was old, its edges crumbling, but the ink still shimmered with an otherworldly glow. Markings indicated a path through the densest part of the forest, to a place locals whispered about but few claimed to have seen.\n\n'You shouldn't go alone,' cautioned her friend Thorne, always the voice of reason. 'The forest changes at night. Paths disappear.'\n\n'Then come with me,' Elara challenged, her eyes bright with excitement. 'Or are you afraid?'\n\nThorne sighed, knowing he couldn't let her venture alone. 'Someone has to make sure you return in one piece.'\n\nThey set out at dawn, following the map's winding trail. The forest grew thicker as they progressed, ancient trees towering overhead, their canopies blocking out the sun. Strange flowers glowed along the path, and creatures watched from the shadows with curious eyes.\n\nBy midday, they reached a cliff face covered in vines. According to the map, the entrance should be here, but all they saw was solid rock.\n\n'Perhaps we misread the directions,' Thorne suggested, but Elara wasn't convinced.\n\nShe approached the cliff, running her fingers along the cool stone. When her hand passed over a particular section, the vines trembled and began to part, revealing a narrow opening.\n\n'How did you know?' Thorne asked, astonished.\n\nElara smiled mysteriously. 'Grandmother always said our family had a connection to the old magic.'\n\nThey entered cautiously, lighting a lantern as the passage grew dark. The tunnel wound downward, the air becoming cooler and filled with a strange, sweet scent.\n\nSuddenly, the passage opened into a vast cavern, and both gasped at the sight. Thousands of crystals of every color imaginable lined the walls, ceiling, and floor, each emitting a soft glow that illuminated the space in rainbow hues.\n\nIn the center stood a pedestal of white stone, upon which rested a single crystal larger than the rest, pulsing with inner light.\n\n'The Heart of the Forest,' Elara whispered, recognizing it from her grandmother's stories. 'They say it grants one true wish to those pure of heart.'\n\nAs they approached, the crystal's light intensified. Reflections danced across the cavern walls, creating moving images – scenes from the past, glimpses of possible futures.\n\n'What will you wish for?' Thorne asked softly.\n\nElara stood before the crystal, feeling its energy wash over her. In that moment, she understood why her grandmother had left her the map. This wasn't about making a wish at all.\n\n'The crystal doesn't grant wishes,' she said with sudden clarity. 'It shows truth.'\n\nShe placed her hands on the crystal, and knowledge flowed into her – the forest's secrets, the balance of nature, the responsibility of those who could hear the old magic.\n\nWhen they emerged from the cavern hours later, both were changed. Elara carried not treasure, but wisdom, and the understanding that she was now a guardian of the forest's mysteries.\n\nThe crystal cavern remained hidden, waiting for the next seeker who needed its truth. And in the village, people soon began to notice how the forest seemed healthier, the crops more bountiful, and how Elara always seemed to know exactly which herbs would cure any ailment.\n\nSome said it was just coincidence. But those who looked closely might notice the faint glow in her eyes – the same shimmer as the ink on an old map that now hung, framed, above her fireplace.",
    model: "book",
  },
  {
    id: "2",
    title: "Echoes Across Time",
    genre: "Sci-Fi",
    tone: "Serious",
    preview:
      "Dr. Eliza Chen never believed in the impossible until her quantum experiment created a bridge across time. When signals from the future began appearing on her monitors...",
    content:
      "Echoes Across Time\n\nDr. Eliza Chen never believed in the impossible until her quantum experiment created a bridge across time. When signals from the future began appearing on her monitors, she faced a choice that would alter the course of humanity.\n\nThe laboratory hummed with energy as Eliza adjusted the final parameters of the quantum resonance chamber. After three years of work, countless failures, and the ridicule of her peers, tonight would prove whether her theories about temporal wave communication were valid.\n\n'Power levels stable,' reported Marcus, her loyal research assistant. 'Quantum field integrity at 98 percent.'\n\n'Initiate the sequence,' Eliza commanded, her voice steady despite the nervous flutter in her chest.\n\nThe machine pulsed with blue light as it generated a controlled quantum field designed to detect ripples in spacetime. According to Eliza's calculations, these ripples could potentially carry information—like radio waves, but unrestricted by linear time.\n\nAt first, nothing happened. The monitors showed only background noise, the expected quantum fluctuations.\n\n'Maybe we should—' Marcus began, but stopped when a pattern emerged on the main screen.\n\n01001000 01000101 01001100 01010000\n\nBinary code. Simple, unmistakable.\n\n'Is that...?' Marcus whispered.\n\nEliza's fingers flew across the keyboard, translating. 'HELP,' she read aloud, her voice barely audible.\n\nMore code followed, faster now.\n\nDANGER. STOP PROJECT. FUTURE DEPENDS ON IT.\n\n'This can't be real,' Marcus said, but his pale face suggested he believed otherwise.\n\nEliza stared at the message, scientific curiosity warring with growing dread. 'If this is genuine, someone in the future is using our technology to send a warning back to us.'\n\nOver the next week, more messages arrived, each more detailed than the last. They spoke of a catastrophic event—the Collapse—triggered by the evolution of Eliza's technology. According to the messages, her quantum communication system would eventually allow for manipulation of past events, creating temporal paradoxes that destabilized reality itself.\n\nThe final message included schematics for a device that could safely dismantle the quantum bridge without losing the valuable data they'd collected.\n\n'We have to shut it down,' Marcus insisted after reading the latest warning.\n\nBut Eliza hesitated. 'What if this is sabotage? A competitor trying to halt our research?'\n\n'Who could possibly fake quantum signals from the future?' Marcus countered. 'The technology to do that doesn't exist yet—except in this lab.'\n\nEliza spent sleepless nights analyzing the data, searching for any sign of fraud. Instead, she found something more disturbing: subtle quantum signatures that matched theoretical models of temporal displacement. The messages were genuine.\n\nOn the seventh day, a new type of transmission arrived—not code, but a fragmented video feed. The image was distorted, but clear enough to see devastation on an unimaginable scale: cities in ruins, strange fractures in the sky itself that seemed to tear at the fabric of reality.\n\nA figure appeared on screen, face obscured by static. '...Dr. Chen... if you're receiving this... must destroy... the resonance chamber... before the bridge stabilizes permanently... our reality is... collapsing...'\n\nThe feed cut out, leaving Eliza staring at her reflection in the darkened monitor. The face that looked back was transformed by the weight of an impossible choice: scientific achievement that would ensure her place in history, or destruction of her life's work based on warnings from a future that might never come to pass.\n\nIn the end, it wasn't really a choice at all.\n\nThe next morning, Eliza and Marcus followed the schematics precisely, carefully dismantling the quantum bridge while preserving their research data. As the final connection was severed, the monitors flashed once with a simple message:\n\nTHANK YOU\n\nYears later, long after Eliza had redirected her research to safer applications of quantum theory, she sometimes stood at her window at night, looking at the stars and wondering about the future she'd never see—the future she had saved.\n\nAnd sometimes, in the quiet moments between waking and sleep, she could almost hear echoes across time—whispers of gratitude from generations yet unborn, for the sacrifice of a discovery that would have changed everything, and in doing so, destroyed it all.",
    model: "rocket",
  },
  {
    id: "3",
    title: "The Last Letter",
    genre: "Mystery",
    tone: "Serious",
    preview:
      "Detective Morgan Reed thought the Harrington case was closed until a letter arrived twenty years to the day after the murder. The faded envelope contained a confession that would unravel everything...",
    content:
      "The Last Letter\n\nDetective Morgan Reed thought the Harrington case was closed until a letter arrived twenty years to the day after the murder. The faded envelope contained a confession that would unravel everything she thought she knew about the town's most notorious crime.\n\nThe letter sat on Morgan's desk, innocuous in its cream-colored envelope, postmarked from a town three hundred miles away. No return address. Just her name and the precinct number written in careful, measured handwriting.\n\nShe might have mistaken it for ordinary mail if not for the date—April 17th. Twenty years to the day since Catherine Harrington's body was found in the woods outside Oakridge.\n\n'Another anniversary card from a true crime enthusiast?' asked Detective Wilson, leaning against her desk with a coffee mug in hand.\n\nMorgan shook her head. 'Different handwriting. And it's postmarked Glendale.'\n\nShe slid a letter opener under the flap, careful not to tear what might be evidence. Inside was a single sheet of paper, the same cream color as the envelope.\n\nI am writing to confess to the murder of Catherine Harrington on April 16, 2003. James Thornton is innocent. I can prove it. If you want the truth, come alone to 1457 Lakeside Drive, Glendale. April 20th. 3 PM.\n\nNo signature.\n\nMorgan felt a chill despite the office's stuffy warmth. James Thornton had been convicted of Catherine's murder based on circumstantial evidence and a partial fingerprint. He'd maintained his innocence through the trial and fifteen years of appeals before dying in prison five years ago.\n\n'What is it?' Wilson asked, noticing her expression.\n\nShe hesitated. The Harrington case had been her first as lead detective. The conviction had made her career, but the nagging doubts had never fully disappeared.\n\n'Probably nothing,' she said, slipping the letter into her desk drawer. 'Just another crackpot.'\n\nBut that night, Morgan pulled the case files from her home office. Photos of Catherine Harrington—beautiful, ambitious, only twenty-six when her life was cut short. Crime scene images. Witness statements. The evidence that had seemed so compelling then looked thinner now, viewed through the lens of twenty years' experience.\n\nThree days later, Morgan drove to Glendale alone, against department protocol and her better judgment. 1457 Lakeside Drive turned out to be a modest lakefront cottage, well-maintained but showing its age.\n\nA woman waited on the porch. Elderly, with silver hair and eyes that still held remarkable sharpness. Something about her seemed familiar, though Morgan was certain they'd never met.\n\n'Detective Reed,' the woman said. Not a question. 'I'm Eleanor Winters. Thank you for coming.'\n\nInside, the cottage was neat and sparsely furnished. On the coffee table lay a wooden box and a thick manila envelope.\n\n'Before I explain,' Eleanor said, 'I want you to know that I have terminal cancer. The doctors give me less than a month. That's why, after all these years, I'm finally telling the truth.'\n\nShe opened the box and removed a locket—silver, tarnished with age. Morgan recognized it immediately from the case file: Catherine Harrington's missing necklace, believed taken by her killer.\n\n'Where did you get that?' Morgan asked, voice tight.\n\n'From Catherine. The night she died.' Eleanor's hands trembled slightly. 'She gave it to me when I told her I was leaving town. A keepsake, she called it.'\n\nThe story emerged slowly. Eleanor had been Catherine's secret lover at a time when such relationships could destroy careers and families in a small town like Oakridge. They had planned to leave together, start fresh somewhere more accepting.\n\n'But then I got scared,' Eleanor said, eyes fixed on some distant point. 'My family, my position at the university... I told her I couldn't go through with it. We argued in the woods where we often met privately. She was angry, hurt. Threw the necklace at me and stormed off.'\n\nEleanor had left, driving aimlessly for hours. When she returned to look for Catherine and apologize, she found police cars and crime scene tape.\n\n'James Thornton was there earlier that evening,' Eleanor explained. 'Catherine had tutored his daughter. They argued over a payment, which is why his fingerprint was on her bag. But he left before I arrived. I watched him go.'\n\nThe manila envelope contained journals, photographs, letters—evidence of the relationship and Eleanor's whereabouts that night, including a gas station receipt from a town fifty miles away, timestamped just after the estimated time of death.\n\n'Why didn't you come forward?' Morgan asked, though she already knew the answer.\n\n'Cowardice,' Eleanor said simply. 'By the time I realized they suspected James, it seemed too late. Coming forward meant exposing everything. And then they found that fingerprint, and everyone was so certain...' Her voice trailed off.\n\n'So you let an innocent man go to prison.'\n\n'Yes.' No excuses. No justification. Just the weight of twenty years of guilt in that single word.\n\nMorgan left with the evidence, her mind racing. The case would be reopened. James Thornton's name would be cleared posthumously. Catherine's real killer—likely a drifter who happened upon her alone in the woods—might never be found.\n\nAnd Eleanor Winters would spend her final days knowing she had finally told the truth, though far too late to save the man whose life had been sacrificed for her secret.\n\nTwo weeks later, Morgan received another envelope. Inside was an obituary for Eleanor Winters, and a short note:\n\nThe truth matters, even when it comes too late. Thank you for listening.\n\nMorgan placed it carefully in the Harrington file—the last piece of a puzzle that had taken twenty years to complete.",
    model: "magnifying-glass",
  },
];

const Examples = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedStory, setSelectedStory] = useState(exampleStories[0]);
  const [activeTab, setActiveTab] = useState("preview");

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCopyStory = (content: string) => {
    navigator.clipboard.writeText(content);
    // In a real app, you would show a toast notification here
  };

  const handleDownloadStory = (story: (typeof exampleStories)[0]) => {
    const blob = new Blob([story.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Example Stories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore these sample stories generated with our AI to see what's
            possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {exampleStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => {
                setSelectedStory(story);
                setActiveTab("preview");
              }}
            >
              <Card
                className={`h-full border ${selectedStory.id === story.id ? "border-primary" : "border-border"}`}
              >
                <CardHeader className="pb-3">
                  <CardTitle>{story.title}</CardTitle>
                  <CardDescription>
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mr-2">
                      {story.genre}
                    </span>
                    <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                      {story.tone}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-32 overflow-hidden">
                  <p className="text-sm text-muted-foreground line-clamp-5">
                    {story.preview}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStory(story);
                      setActiveTab("full");
                    }}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Full Story
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{selectedStory.title}</CardTitle>
              <CardDescription>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {selectedStory.genre}
                  </span>
                  <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                    {selectedStory.tone}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="full">Full Story</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <p className="text-muted-foreground">
                    {selectedStory.preview}
                  </p>
                </TabsContent>
                <TabsContent value="full" className="mt-4">
                  <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
                    {selectedStory.content
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyStory(selectedStory.content)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadStory(selectedStory)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full h-[400px] flex items-center justify-center p-4">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl font-bold text-primary">
                {selectedStory.model === "book" && "📚"}
                {selectedStory.model === "rocket" && "🚀"}
                {selectedStory.model === "magnifying-glass" && "🔍"}
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Ready to create your own story?
          </h2>
          <Button asChild size="lg">
            <Link to="/generator">
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>

      <footer className="py-6 text-center text-muted-foreground border-t border-border mt-12">
        <p>
          © {new Date().getFullYear()} NarrativeForge | Powered by Google
          Gemini 1.5 Pro API
        </p>
      </footer>
    </div>
  );
};

export default Examples;
