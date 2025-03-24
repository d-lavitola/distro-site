'use client';

import { Container, Title, Text, Button, Group, Stack, Image } from '@mantine/core';
import { IconUpload, IconMusic } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Container size="lg" py={100}>
        <Group justify="space-between" align="center" gap="xl">
          <Stack gap="xl" style={{ flex: 1 }}>
            <Title order={1} size={48} fw={800} lineClamp={2}>
              Distribute Your Music to All Major Streaming Platforms
            </Title>
            <Text size="xl" c="dimmed" maw={600}>
              Upload your tracks once and reach millions of listeners across Spotify, Apple Music, Amazon Music, and more. Start your music journey today.
            </Text>
            <Group gap="md">
              <Button 
                size="lg" 
                leftSection={<IconUpload size={20} />}
                onClick={() => {
                  router.push('/upload');
                }}
              >
                Upload Your Music
              </Button>
              <Button size="lg" variant="light" leftSection={<IconMusic size={20} />}>
                Learn More
              </Button>
            </Group>
          </Stack>
          <Image
            src="/hero-image.png"
            alt="Music Distribution"
            w={500}
            h={400}
            style={{ objectFit: 'contain' }}
          />
        </Group>
      </Container>

      <Container size="lg" py={100}>
        <Title order={2} ta="center" mb={50}>
          Why Choose Our Platform?
        </Title>
        <Group grow align="flex-start" gap="xl">
          <Stack gap="md">
            <Title order={3}>Global Reach</Title>
            <Text c="dimmed">
              Get your music on all major streaming platforms worldwide, including Spotify, Apple Music, Amazon Music, and more.
            </Text>
          </Stack>
          <Stack gap="md">
            <Title order={3}>Fair Pricing</Title>
            <Text c="dimmed">
              Keep 100% of your royalties with our simple, transparent pricing plans. No hidden fees or surprises.
            </Text>
          </Stack>
          <Stack gap="md">
            <Title order={3}>Easy Upload</Title>
            <Text c="dimmed">
              Upload your music in just a few clicks. Our platform handles all the technical details for you.
            </Text>
          </Stack>
        </Group>
      </Container>
    </>
  );
}
