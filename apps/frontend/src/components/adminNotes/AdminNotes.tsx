import { Button, Flex, Heading, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { AdminNotes } from '../../types/formSchema';
import { patchAdminNotes } from '../../utils/sendRequest';
import { useParams } from 'react-router-dom';

interface AdminNotesProps {
  notes: AdminNotes;
}

export const ViewAdminNotes: React.FC<AdminNotesProps> = ({ notes }) => {
  const [savedNotes, setSavedNotes] = useState(notes);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState<null | string>(null);

  const { id } = useParams();
  const onSave = () => {
    if (id) {
      const newSavedNotes = [
        { note: newNote, updatedAt: new Date() },
        ...savedNotes,
      ];
      patchAdminNotes(id, newSavedNotes)
        .then(() => {
          setSavedNotes(newSavedNotes);
          setNewNote('');
        })
        .catch((e) => {
          setError('Error encountered while saving note.');
          console.error(e);
        });
    }
  };
  return (
    <Flex flexDirection="column" marginTop="40px">
      <Heading size="md" marginBottom="16px">
        Admin Notes
      </Heading>
      <Flex flexDirection="column" maxWidth="60ch">
        {error && (
          <Text color="red" marginBottom="8px">
            {error}
          </Text>
        )}

        <Textarea
          placeholder="Create a new note"
          value={newNote}
          onChange={(e) => {
            setNewNote(e.target.value);
          }}
        />

        <Button
          colorScheme="teal"
          margin="16px 0px 40px"
          isDisabled={newNote === ''}
          onClick={onSave}
        >
          Save
        </Button>
      </Flex>
      <Heading size="md" marginBottom="16px">
        Previous Notes
      </Heading>
      {savedNotes
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .map((note) => (
          <Flex flexDirection="column" key={`${note.note}`}>
            <Text size="xs" color="gray.500" margin="4px">
              Last updated: {note.updatedAt.toLocaleString()}
            </Text>
            <Textarea maxWidth="60ch" value={note.note} readOnly={true} />
          </Flex>
        ))}
    </Flex>
  );
};
