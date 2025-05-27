import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Check, Plus, Trash2 } from 'lucide-react';

const formSchema = z.object({
  players: z.object({ name: z.string().min(1, 'Obligatoriskt') }).array(),
});
type FormInput = z.infer<typeof formSchema>;
type Props = {
  onSubmit: (data: FormInput) => void;
};

export const PlayersForm = (props: Props) => {
  const { onSubmit } = props;

  const formMethods = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      players: [{ name: '' }],
    },
  });
  const { control, handleSubmit } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'players',
  });

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 max-h-[60dvh]">
        <div className="overflow-y-auto flex flex-col gap-4 px-4 pb-1">
          {fields.map((f, index) => (
            <FormField
              key={f.id}
              control={control}
              name={`players.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spelare ({index + 1})</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input {...field} className="flex-1" />
                      <button
                        onClick={() => remove(index)}
                        type="button"
                        className="p-1 text-red-800 disabled:opacity-25"
                        disabled={fields.length <= 1}
                      >
                        <Trash2 className="w-4" />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="flex justify-between px-4">
          <Button type="button" variant="link" onClick={() => append({ name: '' })} className="flex items-center gap-1">
            <Plus />
            <div>Lägg till spelare</div>
          </Button>
          <Button type="submit" variant="default" className="flex items-center gap-1">
            <Check />
            <div>Spara</div>
          </Button>
        </div>
      </form>
    </Form>
  );
};
