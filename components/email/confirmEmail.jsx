// Obtenez le code source complet, y compris le thème et la configuration Tailwind :
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';


export const ConfirmEmail = ({
  url,
})=>{
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview>Confirmez votre adresse e-mail sur novocv</Preview>
          <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">
            <Img
              src={`${process.env.APP_URL}/Images/logo.png`}
              width="40"
              height="33"
              alt="Logo novocv"
            />
            <Section>
              <Text className="text-base font-sans font-light text-[#404040] leading-[26px]">
                Salut,
              </Text>
              <Text className="text-base font-sans font-light text-[#404040] leading-[26px]">
                Merci de vous être inscrit sur **novocv** ! Pour finaliser la création de votre compte et activer toutes vos fonctionnalités, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :
              </Text>
              <Button
                className="bg-[#5c5792] rounded text-white text-[15px] font-medium no-underline text-center block w-[210px] py-[14px] px-[7px] my-[24px]"
                href={url}
              >
                Confirmer mon e-mail
              </Button>
              <Text className="text-base font-sans font-light text-[#404040] leading-[26px]">
                Si vous n'avez pas créé de compte sur notre plateforme, vous pouvez simplement ignorer et supprimer ce message.
              </Text>
              <Text className="text-sm font-sans font-light text-[#707070] leading-[26px] mt-[16px]">
                Ce lien de confirmation est valable pendant 15 minutes.
              </Text>
              <Text className="text-base font-sans font-light text-[#404040] leading-[26px] mt-[24px]">
                À très vite sur novocv !
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmEmail;
