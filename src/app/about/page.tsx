import { Container, Title, Text, Stack, Group, ThemeIcon } from '@mantine/core';
import { IconHeart, IconMusic, IconUsers } from '@tabler/icons-react';

export default function About() {
  return (
    <Container size="lg" py={100}>
      <Stack gap="xl">
        <Title order={1} size={48} fw={800}>
          About Distro
        </Title>
        <Text size="xl" c="dimmed">
          We're on a mission to democratize music distribution and help artists reach their full potential.
        </Text>
        
        <Group gap="xl" mt={50}>
          <Stack gap="md" style={{ flex: 1 }}>
            <ThemeIcon size={50} radius="md" variant="light">
              <IconMusic size={26} stroke={1.5} />
            </ThemeIcon>
            <Title order={3}>Our Story</Title>
            <Text>
              Founded in 2024, Distro emerged from a simple observation: too many talented artists were struggling to get their music out to the world. We set out to create a platform that makes music distribution accessible, transparent, and artist-friendly.
            </Text>
          </Stack>
          
          <Stack gap="md" style={{ flex: 1 }}>
            <ThemeIcon size={50} radius="md" variant="light">
              <IconHeart size={26} stroke={1.5} />
            </ThemeIcon>
            <Title order={3}>Our Mission</Title>
            <Text>
              We believe that every artist deserves the opportunity to share their music with the world. Our platform provides the tools and support needed to make this happen, while ensuring artists maintain control and receive fair compensation for their work.
            </Text>
          </Stack>
          
          <Stack gap="md" style={{ flex: 1 }}>
            <ThemeIcon size={50} radius="md" variant="light">
              <IconUsers size={26} stroke={1.5} />
            </ThemeIcon>
            <Title order={3}>Our Community</Title>
            <Text>
              We're proud to serve a diverse community of artists, from independent musicians to established labels. Our platform is designed to grow with you as your career evolves.
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Container>
  );
} 
