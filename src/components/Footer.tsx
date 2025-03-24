'use client';

import { Container, Group, Text, Stack, Button, Divider } from '@mantine/core';
import { IconBrandTwitter, IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import Link from 'next/link';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
};

export function Footer() {
  return (
    <Container size="lg" py={50}>
      <Group align="flex-start" justify="space-between" mb={50}>
        <Stack gap="xs">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Text size="xl" fw={700}>
              Distro
            </Text>
          </Link>
          <Text size="sm" c="dimmed" maw={300}>
            Your one-stop platform for music distribution. Reach millions of listeners worldwide.
          </Text>
        </Stack>
        <Group gap={30}>
          {Object.entries(footerLinks).map(([category, links]) => (
            <Stack key={category} gap="xs">
              <Text fw={700} tt="capitalize">
                {category}
              </Text>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="subtle" p={0} h="auto">
                    {link.label}
                  </Button>
                </Link>
              ))}
            </Stack>
          ))}
        </Group>
      </Group>
      <Divider mb={30} />
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          © {new Date().getFullYear()} Distro. All rights reserved.
        </Text>
        <Group gap="md">
          <Button variant="subtle" p={0} h="auto">
            <IconBrandTwitter size={20} />
          </Button>
          <Button variant="subtle" p={0} h="auto">
            <IconBrandInstagram size={20} />
          </Button>
          <Button variant="subtle" p={0} h="auto">
            <IconBrandFacebook size={20} />
          </Button>
        </Group>
      </Group>
    </Container>
  );
} 
