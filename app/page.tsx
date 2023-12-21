'use client';

import {
  Grid,
  Card,
  Heading,
  Flex,
  Badge,
  Text,
  Avatar,
} from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export default function Page() {
  const URL = 'https://api.itbook.store/1.0/new';
  const [libros, setLibros] = useState([]);

  // alert(Math.floor(supera));

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const respuesta = await fetch(URL);
        const data = await respuesta.json();
        setLibros(data.books);
      } catch (error) {
        console.error('Error al cargar los libros:', error);
      }
    };

    cargarLibros();
  }, []);

  return (
    <div>
      <Grid columns="3" gap="4">
        {libros.map((book) => (
          <Card key={book.isbn13}>
            <Avatar src={book.image} fallback="A" />
            <Heading size="3">{book.title}</Heading>
            <Flex
              justify="between"
              direction="column"
              width="max-content"
              align="start"
            >
              <Badge
                color={
                  Math.floor(parseFloat(book.price.replace('$', ''))) < 20
                    ? 'yellow'
                    : Math.floor(parseFloat(book.price.replace('$', ''))) > 30
                    ? 'green'
                    : 'blue'
                }
              >
                {book.price}
              </Badge>
              <Text size="1">{book.subtitle}</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
