'use client';

import { Container, Title, Text, TextInput, Textarea, Button, Stack, Group, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function Contact() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      subject: (value) => (value.length < 2 ? 'Subject must be at least 2 characters' : null),
      message: (value) => (value.length < 10 ? 'Message must be at least 10 characters' : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
    // Here you would typically send the form data to your backend
  });

  return (
    <Container size="lg" py={100}>
      <Stack gap="xl" mb={50}>
        <Title order={1} size={48} fw={800} ta="center">
          Contact Us
        </Title>
        <Text size="xl" c="dimmed" ta="center" maw={600} mx="auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Text>
      </Stack>

      <Paper shadow="md" radius="md" p="xl" maw={600} mx="auto">
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="Your name"
              required
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Subject"
              placeholder="How can we help?"
              required
              {...form.getInputProps('subject')}
            />
            <Textarea
              label="Message"
              placeholder="Your message"
              minRows={4}
              required
              {...form.getInputProps('message')}
            />
            <Group justify="flex-end" mt="md">
              <Button type="submit">Send Message</Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 
