import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import Link from "next/link";

export default function Upload() {
  return (
    <Container size="lg" py={100}>
      <Stack gap="xl">
        <Title order={1} size={48} fw={800}>
          Upload Your Music
        </Title>
        <Text size="xl" c="dimmed">
          Upload your tracks and distribute them to all major streaming platforms.
        </Text>
        <Group gap="md">
          <Button
            variant="light"
            leftSection={<IconUpload size={20} />}
            component={Link}
            href="/upload/youtube"
          >
            Upload Tracks
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
