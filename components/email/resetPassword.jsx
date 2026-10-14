// Obtenez le code source complet, y compris le thème et la configuration Tailwind :
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';


export const ResetPasswordEmail = ({
  url,
}) => {
  return (
    <Html>
      <Head />
      <Tailwind >
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview>Réinitialisation de votre mot de passe </Preview>
          <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">
            <Img
              src={`${process.env.APP_URL}/Images/logo.png`}
              width="40"
              height="33"
              alt="logo"
            />
            <Section>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Salut,
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Une demande de modification de mot de passe a récemment été effectuée pour votre compte. S'il s'agit de vous, vous pouvez définir un nouveau mot de passe ici :
              </Text>
              <Button
                className="bg-[#5c5792] rounded text-white text-[15px] no-underline text-center font-dropbox-sans block w-[210px] py-[14px] px-[7px]"
                href={url}
              >
                Réinitialiser le mot de passe
              </Button>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Si vous ne souhaitez pas modifier votre mot de passe ou si vous n'avez pas fait cette demande, ignorez et supprimez simplement ce message.
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Ce lien n'est valable que  15 minutes.{' '}
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Bonne continuation avec novocv !
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default ResetPasswordEmail;
