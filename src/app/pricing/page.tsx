import { Container, Title, Text, SimpleGrid, Card, Button, Group, ThemeIcon, Badge, Stack } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const tiers = [
  {
    name: 'Basic',
    price: '$9.99',
    description: 'Perfect for independent artists',
    features: [
      'Up to 10 tracks per release',
      'Basic analytics',
      'Standard support',
      'Monthly payments',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19.99',
    description: 'For growing artists',
    features: [
      'Unlimited tracks',
      'Advanced analytics',
      'Priority support',
      'Weekly payments',
      'Custom release dates',
      'Pre-release links',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For labels and large artists',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'API access',
      'Custom reporting',
      'White-label options',
      'Priority distribution',
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <Container size="lg" py={100}>
      <Stack gap="xl" mb={50}>
        <Title order={1} size={48} fw={800} ta="center">
          Simple, Transparent Pricing
        </Title>
        <Text size="xl" c="dimmed" ta="center" maw={600} mx="auto">
          Choose the plan that best fits your needs. All plans include access to major streaming platforms.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {tiers.map((tier) => (
          <Card key={tier.name} shadow="md" radius="md" padding="xl">
            {tier.popular && (
              <Badge color="blue" variant="light" mb="md">
                Most Popular
              </Badge>
            )}
            <Title order={3} size="h2" mb="md">
              {tier.name}
            </Title>
            <Text size="xl" fw={700} mb="md">
              {tier.price}
            </Text>
            <Text size="sm" c="dimmed" mb="xl">
              {tier.description}
            </Text>
            <Group mb="xl">
              <Button variant={tier.popular ? 'filled' : 'light'} fullWidth>
                Get Started
              </Button>
            </Group>
            <Stack gap="sm">
              {tier.features.map((feature) => (
                <Group key={feature} gap="sm">
                  <ThemeIcon size={20} radius="xl" variant="light" color="green">
                    <IconCheck size={12} stroke={1.5} />
                  </ThemeIcon>
                  <Text size="sm">{feature}</Text>
                </Group>
              ))}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
} 
