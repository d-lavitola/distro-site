'use client';

import { Container, Group, Button, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <Container size="lg" py="md">
      <Group justify="space-between">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Text size="xl" fw={700}>
            Distro
          </Text>
        </Link>

        <Group gap="sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant={pathname === link.href ? 'light' : 'subtle'}
                color="gray"
              >
                {link.label}
              </Button>
            </Link>
          ))}
          <Button>Get Started</Button>
        </Group>
      </Group>
    </Container>
  );
} 
