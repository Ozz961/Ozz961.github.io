document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       FOOTER YEAR
    ------------------------- */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* -------------------------
       TERMINAL
    ------------------------- */

    const terminal = document.getElementById("terminal-output");

    const commands = [
        {
            command: "whoami",
            output: "ozz961"
        },
        {
            command: "uname -a",
            output: "Linux security-lab x86_64 GNU/Linux"
        },
        {
            command: "pwd",
            output: "/home/ozz961/security"
        },
        {
            command: "ls -la",
            output: "writeups   projects   tools   research"
        },
        {
            command: "nmap -sC -sV target.local",
            output: "22/tcp open ssh · 80/tcp open http · 445/tcp open smb"
        },
        {
            command: "rustscan -a target.local",
            output: "[*] Scanning ports..."
        },
        {
            command: "gobuster dir -u http://target.local",
            output: "/login   /api   /admin   /backup"
        },
        {
            command: "ffuf -u https://target.local/FUZZ",
            output: "[*] Running directory discovery..."
        },
        {
            command: "curl -I https://target.local",
            output: "HTTP/2 200 · server: nginx"
        },
        {
            command: "dig target.local",
            output: "A 10.10.10.20"
        },
        {
            command: "nslookup target.local",
            output: "Name: target.local · Address: 10.10.10.20"
        },
        {
            command: "smbclient -L //target.local",
            output: "IPC$   WorkShares"
        },
        {
            command: "crackmapexec smb target.local",
            output: "[*] SMB signing: False"
        },
        {
            command: "python3 recon.py --target target.local",
            output: "[+] Recon complete"
        },
        {
            command: "grep -Ri \"TODO\\|FIXME\" ./projects",
            output: "./projects/recon/main.py"
        },
        {
            command: "git status",
            output: "On branch main · nothing to commit"
        },
        {
            command: "docker ps",
            output: "ai-lab   security-lab   Up"
        },
        {
            command: "python3 ai_security.py",
            output: "[*] Mapping attack surface... [*] Analysis complete"
        },
        {
            command: "nikto -h https://target.local",
            output: "[*] Checking headers and known files..."
        },
        {
            command: "nuclei -u https://target.local",
            output: "[*] Running vulnerability templates..."
        },
        {
            command: "git log --oneline -5",
            output: "add ai security lab · update htb writeups · add recon tooling"
        },
        {
            command: "echo \"Keep learning.\"",
            output: "Keep learning."
        }
    ];

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
