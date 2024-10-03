import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Container,
    Divider,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
    useToast,
    VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaComment, FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const greetings = [
    { text: "안녕하세요!", language: "한국어" },
    { text: "こんにちは", language: "日本語" },
    { text: "Bonjour", language: "Français" },
    { text: "你好", language: "中文" },
    { text: "Hello", language: "English" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempted with:', { email, password });
    toast({
      title: "Login Attempted",
      description: "This is where you'd connect to your backend.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    toast({
      title: "Google Login",
      description: "Redirecting to Google login...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleKakaoLogin = () => {
    console.log('Kakao login clicked');
    toast({
      title: "Kakao Login",
      description: "Redirecting to Kakao login...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box minHeight="100vh" bg={useColorModeValue('gray.100', 'gray.900')} py={12}>
      <Container maxW="md" centerContent>
        <Box
          bg={bgColor}
          p={8}
          rounded="lg"
          shadow="xl"
          w="full"
          textAlign="center"
        >
          <Heading mb={6} fontSize="4xl" color={textColor}>
            {greetings[currentGreeting].text}
          </Heading>
          <Text fontSize="sm" color="gray.500" mb={6}>
            {greetings.map((greeting, index) => (
              <Text
                key={index}
                as="span"
                fontWeight={index === currentGreeting ? "bold" : "normal"}
                mx={1}
              >
                {greeting.text}
              </Text>
            ))}
          </Text>
          <form onSubmit={handleLogin}>
            <VStack spacing={4}>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
              <Button type="submit" colorScheme="blue" width="full">
                로그인
              </Button>
            </VStack>
          </form>
          <Divider my={6} />
          <VStack spacing={4}>
            <Button
              onClick={handleGoogleLogin}
              leftIcon={<FaGoogle />}
              colorScheme="red"
              variant="outline"
              width="full"
            >
              Google로 로그인
            </Button>
            <Button
              onClick={handleKakaoLogin}
              leftIcon={<FaComment />}
              colorScheme="yellow"
              variant="outline"
              width="full"
            >
              Kakao로 로그인
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;