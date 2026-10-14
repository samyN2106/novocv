
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
} from "react-email";


export const WelcomeEmail = () => (
  <Html lang="fr">
    <Head />
    <Tailwind >
      <Body className="bg-white font-sans">
        <Preview>
          Bienvenue sur novocv ! Créez un CV professionnel qui vous ressemble.
        </Preview>

        <Container className="mx-auto py-5 pb-12">
          <Img
            src={`${process.env.APP_URL}/Images/logo.png`}
            width="170"
            height="50"
            alt="Logo Saas CV"
            className="mx-auto"
          />

          <Text className="text-[16px] leading-[26px]">
            Salut,
          </Text>

          <Text className="text-[16px] leading-[26px]">
            Nous sommes ravis de vous accueillir sur novocv!
          </Text>

          <Text className="text-[16px] leading-[26px]">
            Votre compte a été créé avec succès. Vous pouvez désormais
            concevoir un CV professionnel, mettre en valeur vos compétences
            et présenter votre parcours de manière claire et élégante.
          </Text>

          <Text className="text-[16px] leading-[26px]">
            Que vous soyez étudiant, jeune diplômé ou professionnel,
            novocv vous accompagne dans la création d'un CV adapté
            à vos objectifs.
          </Text>

          <Text className="text-[16px] leading-[26px]">
            Nous vous souhaitons une excellente expérience sur notre
            plateforme et beaucoup de réussite dans vos projets
            professionnels.
          </Text>

          <Text className="text-[16px] leading-[26px]">
            À très bientôt,
            <br />
            L'équipe novocv
          </Text>

          <Hr className="border-[#cccccc] my-5" />

          <Text className="text-[#8898aa] text-[12px] leading-[20px] text-center">
            Vous recevez cet e-mail parce que vous avez créé un compte
            sur novocv.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
