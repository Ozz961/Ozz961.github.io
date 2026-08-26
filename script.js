document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /*
     * Smooth reveal animation
     */

    const revealElements = document.querySelectorAll(
        ".focus-card, .writeup-item, .project-card, .research-box"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });


    /*
     * Subtle mouse movement for desktop ambient effect
     */

    const hero = document.querySelector(".hero");

    if (hero && window.matchMedia("(pointer:fine)").matches) {

        hero.addEventListener("mousemove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width - 0.5) * 12;

            const y =
                ((event.clientY - rect.top) / rect.height - 0.5) * 12;

            const terminal = document.querySelector(".hero-terminal");

            if (terminal) {
                terminal.style.transform =
                    `perspective(1000px) rotateY(${-3 + x * 0.08}deg) rotateX(${y * -0.04}deg)`;
            }
        });

        hero.addEventListener("mouseleave", () => {

            const terminal = document.querySelector(".hero-terminal");

            if (terminal) {
                terminal.style.transform =
                    "perspective(1000px) rotateY(-3deg)";
            }
        });
    }
});
