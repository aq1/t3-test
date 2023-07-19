import * as Popover from "@radix-ui/react-popover";

export default function Index() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div>
        <Popover.Root>
          <Popover.Trigger className="bg-white p-2">More info</Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="w-40 border-2 bg-white p-5">
              Some more info…
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}
