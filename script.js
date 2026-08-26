document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       FOOTER YEAR
    ------------------------- */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    let commandIndex = 0;

    function printCommand() {

        if (!terminal) {
            return;
        }

        terminal.innerHTML = "";

        const current = commands[commandIndex];

        const commandLine = document.createElement("div");
        commandLine.className = "terminal-line";

        commandLine.innerHTML = `
            <span class="terminal-purple">$</span>
            <span class="terminal-command">${escapeHtml(current.command)}</span>
        `;

        terminal.appendChild(commandLine);

        setTimeout(() => {

            const outputLine = document.createElement("div");
            outputLine.className = "terminal-line terminal-output terminal-success";

            outputLine.textContent = current.output;

            terminal.appendChild(outputLine);

            setTimeout(() => {

                const promptLine = document.createElement("div");
                promptLine.className = "terminal-line";

                promptLine.innerHTML = `
                    <span class="terminal-purple">$</span>
                    <span class="cursor"></span>
                `;

                terminal.appendChild(promptLine);

            }, 180);

        }, 350);

        commandIndex++;

        if (commandIndex >= commands.length) {
            commandIndex = 0;
        }
    }

    function escapeHtml(value) {
        return value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    printCommand();

    setInterval(printCommand, 3200);


    /* -------------------------
       SCROLL REVEALS
    ------------------------- */

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


    /* -------------------------
       HERO MOUSE EFFECT
    ------------------------- */

    const hero = document.querySelector(".hero");

    if (
        hero &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        hero.addEventListener("mousemove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width - 0.5) * 12;

            const y =
                ((event.clientY - rect.top) / rect.height - 0.5) * 12;

            const terminalElement =
                document.querySelector(".hero-terminal");

            if (terminalElement) {

                terminalElement.style.transform =
                    `perspective(1000px)
                     rotateY(${-3 + x * 0.08}deg)
                     rotateX(${y * -0.04}deg)`;
            }
        });


        hero.addEventListener("mouseleave", () => {

            const terminalElement =
                document.querySelector(".hero-terminal");

            if (terminalElement) {

                terminalElement.style.transform =
                    "perspective(1000px) rotateY(-3deg)";
            }
        });

    }

});
