import Particles from "react-tsparticles";
import './ParticleEffect.css';

function ParticleEffect (){

    const particlesInit = (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      };
    
    const particlesLoaded = (container) => {
        console.log(container);
      };
    
      return (
            <div className="particles-ctr">
              <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                      background: {
                        color: {
              value: "#031927",
                        },
                      },
                      fpsLimit: 120,
                      interactivity: {
                        events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: true,
                        },
                        modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.0,
              },
                        },
                      },
                      fullScreen: { enable: false, zIndex: -1 },
                      particles: {
                        color: {
              value: "#ffffff",
                        },
                        links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
                        },
                        collisions: {
              enable: true,
                        },
                        move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
                        },
                        number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
                        },
                        opacity: {
              value: 0.2,
                        },
                        shape: {
              type: "circle",
                        },
                        size: {
              random: true,
              value: 5,
                        },
                      },
                      detectRetina: true,
                    }}
                    />
            </div>
        )
    
}

export default ParticleEffect;