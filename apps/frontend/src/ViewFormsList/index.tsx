import React from 'react';
import {Card, CardHeader, CardBody, Select, Heading, Text, Grid, Button, Box, Center} from '@chakra-ui/react';

export default function ViewFormsList () {
  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size='xl'>Submitted Forms</Heading>
      </Center>
      <Select width='25%' mb={2}>
        <option>Sort by Last Name</option>
        <option>Sort by Recency</option>
      </Select>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/19/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/07/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/07/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/07/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/07/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/07/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/07/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/07/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
        <Card>
          <Text align='right' pr={2} pt={2}>Last updated 03/07/2023</Text>
          <CardHeader>
            <Heading size='lg'>Jennya Alexeyeva</Heading>
          </CardHeader>
          <CardBody>
            <Text>DOB: 05/28/2001</Text>
            <Text>Carmichael Hospital</Text>
            <Text>Carmichael, CA</Text>
            <Button mt={2} colorScheme='blue'>Edit Form</Button>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
}
