window.addEventListener('load', () => {

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    const product = document.querySelector('.glass-card');
    const bgText = document.querySelector('.marquee-wrapper');
    const infos = document.querySelectorAll('.hero-info');

    // Força o estado inicial zerado de segurança antes da timeline começar
    gsap.set(".header", { opacity: 0 });
    gsap.set(".logo, .nav-link, .dropbtn", { opacity: 0 });
    if (product) gsap.set(product, { opacity: 0 });
    if (bgText) gsap.set(bgText, { opacity: 0 });
    if (infos.length) gsap.set(infos, { opacity: 0 });

    // Sequência exata de entrada controlada
    tl.fromTo(".header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".logo", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.2")
      // Links do menu caem em cascata suave do topo
      .fromTo(".nav-link, .dropbtn", { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.4");

    // Adiciona os blocos do conteúdo do main se eles existirem
    if (bgText && product) {
        tl.fromTo(bgText, { scale: 1.05, opacity: 0 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=0.3")
          .fromTo(product, { y: 40, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.4 }, "-=0.9");
    }
    
    if (infos.length) {
        tl.fromTo(infos, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.8");
    }

    // animacao dos links dop menu
    const links = document.querySelectorAll('.nav-link, .dropbtn');

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { skewX: -15, scale: 1.1, color: "#4a505a", duration: 0.5, ease: "power2.out" });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { skewX: 0, scale: 1, color: "#a1a6b0", duration: 0.5, ease: "elastic.out(1.2, 0.5)" });
        });
    });

    
    
    
    // MONITORAMENTO DE SCROLL PARA OCULTAR e EXIBIR O HEADER
    const headerElement = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    if (headerElement) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Se rolar para baixo e passar de 100px, esconde
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                headerElement.classList.add('header-hidden'); 
            } 
            // Se rolar para cima, mostra
            else if (currentScrollY < lastScrollY) {
                headerElement.classList.remove('header-hidden'); 
            }

            lastScrollY = currentScrollY;
        }, { passive: true }); // passive: true melhora a performance do scroll no mobile
    }

   
    // card Magnético e Letreiro de Fundo
    
    const heroSection = document.querySelector('.hero-3d');
    const reflection = document.querySelector('.card-reflection');

    if (heroSection && product && bgText) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth) - 0.5;
            const yPos = (clientY / innerHeight) - 0.5;

            gsap.to(product, {
                x: xPos * 25,
                y: yPos * 25,
                rotationY: xPos * 40,  
                rotationX: -yPos * 40, 
                duration: 0.6,
                ease: "power2.out"
            });

            if (reflection) {
                gsap.to(reflection, { x: -xPos * 30, y: -yPos * 30, duration: 0.6, ease: "power2.out" });
            }

            gsap.to(bgText, { x: -xPos * 45, y: -yPos * 20, duration: 0.8, ease: "power2.out" });

            
        });

        heroSection.addEventListener('mouseleave', () => {
            gsap.to(product, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3.out" });
            gsap.to(bgText, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
            if (reflection) {
                gsap.to(reflection, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
            }
        });
    }

    
});



    

