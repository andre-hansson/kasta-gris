import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PlayersForm } from './forms/PlayersForm';
import { useGameStore } from '@/stores';
import { v4 as uuid } from 'uuid';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const AddPlayers = (props: Props) => {
  const { open, setOpen } = props;
  const { setPlayers } = useGameStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="pb-10 rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Lägg till spelare</SheetTitle>
        </SheetHeader>
        <PlayersForm
          onSubmit={(data) => {
            setPlayers(data.players.map((p) => ({ id: uuid(), name: p.name, score: 0 })));
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
