import { tutorialStacks, type TutorialStack } from "@/data/tutorial";
import TutorialContent from "@/app/tutorial/TutorialContent";

type TutorialParams = {
  params: Promise<{
    stack: string;
  }>;
};

const isValidStack = (candidate: string): candidate is TutorialStack =>
  tutorialStacks.some((stack) => stack.id === candidate);

export default async function TutorialStackPage({ params }: TutorialParams) {
  const { stack: stackParam } = await params;
  const stack = isValidStack(stackParam) ? stackParam : tutorialStacks[0].id;
  return <TutorialContent stack={stack} />;
}
