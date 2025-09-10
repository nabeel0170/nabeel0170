import React from "react";
// State
import { useGetUsersQuery } from "../app/apiSlice";
// Components
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import BackToTop from "../components/BackToTop";
// Config
import { filteredProjects, moreInfo } from "../config";
// Utils
import { updateTitle } from "../utils";

// #region component
const Home = () => {
  const { data: userData } = useGetUsersQuery();

  React.useEffect(() => {
    updateTitle(`${userData.name} | Portfolio`);
  }, [userData]);

  const bio = `I love breaking stuff… and then figuring out how to fix it better. 
  I’m a full-stack developer, building apps for both web and mobile. 
  When I’m not coding, I’m probably optimizing my life, experimenting, or enjoying a good cup of coffee.`;

  return (
    <>
      <Hero name="Nabeel Azar" />
      <main>
        <AboutMe
          avatar_url={userData.avatar_url}
          bio={bio}
          moreInfo={moreInfo}
        />
        <Skills />
        <Projects filteredProjects={filteredProjects} />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
};
// #endregion

export default Home;
