import { redirect } from "next/navigation";

import { tutorialStacks } from "@/data/tutorial";

export default function TutorialIndexPage() {
  redirect(`/tutorial/${tutorialStacks[0].id}`);
}
