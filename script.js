/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const stages = document.querySelectorAll('.stage');
    const typingText = document.getElementById('typing-text');
    const gameContainer = document.querySelector('.game-container');

    // --- Starfield Background --- //
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                alpha: Math.random()
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
        drawStars();
    });

    resizeCanvas();
    initStars();
    drawStars();

    // --- Career Data --- //
    const careerData = [
        {
            title: 'Bigmaum',
            period: '2022.07 ~ 현재',
            role: 'Full-stack Developer',
            description: 'Bigmaum에서 다양한 프로젝트를 수행하며 풀스택 개발 역량을 쌓았습니다.'
        }
    ];

    // --- Project Data --- //
    const projectData = {
        samsung: {
            title: '삼성전자 Digital Marketing 데이터 통합 대시보드',
            period: '2024.07 ~ 현재',
            role: 'Full-stack 개발 및 웹 인프라 운영',
            achievements: [
                'GCP 보안 지수 90%로 향상 및 Private IP 전환을 통한 보안 강화',
                'GitHub Actions 기반 CI/CD 파이프라인 구축 (배포시간 10분 → 3분)',
                'Chart.js 커스텀 차트 및 Skeleton UI 개발로 UX 개선'
            ],
            skills: ['Kotlin', 'SpringBoot', 'JSP', 'JavaScript', 'MySQL', 'BigQuery', 'GCP']
        },
        kia: {
            title: 'KIA 멕시코 사내 시스템 개발',
            period: '2022.09 ~ 현재',
            role: 'Full-stack 1인 개발',
            achievements: [
                '부서별(의료, 안전, 환경 등) 맞춤형 업무 시스템 4종 개발',
                'TDE 기반 DB 암호화 및 서버 분리를 통한 보안 구조 개선',
                '다단계 결재 로직 및 M:N 파일 구조 등 복잡한 비즈니스 로직 설계/구현'
            ],
            skills: ['Node.js', 'MariaDB', 'Linux']
        },
        gis: {
            title: '웹GIS 기반 공경매 정보 시각화 시스템',
            period: '2022.07 ~ 2024.03',
            role: '시스템 설계 및 Full-stack 개발 총괄',
            achievements: [
                '법원 공경매 데이터의 GIS 시각화 및 자동 매칭/알림 기능 구현',
                'AWS Lightsail 기반 인프라 구축 및 운영',
                '전국 지자체 공지사항 크롤링 시스템 구축 및 자동화'
            ],
            skills: ['Node.js', 'PostgreSQL', 'AWS', 'Geoserver']
        }
    };

    // --- Skill Data --- //
    const skills = [
        'Kotlin', 'SpringBoot', 'Node.js', 
        'JavaScript', 'React', 'JSP', 
        'MySQL', 'MariaDB', 'PostgreSQL', 'BigQuery',
        'GCP', 'AWS', 'CI/CD', 'Linux', 'Geoserver',
        'Git', 'Docker', 'Kubernetes', 'TypeScript', 'HTML', 'CSS' // 추가 기술
    ];

    // --- Typing Effect --- //
    const introText = '안녕하세요!\n강승준의 포트폴리오에 오신 것을 환영합니다.';
    let i = 0;
    function typeWriter() {
        if (i < introText.length) {
            typingText.innerHTML += introText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Auto-scroll after typing is complete
            setTimeout(() => {
                window.scrollTo({
                    top: window.innerHeight, // Scroll to the next section
                    behavior: 'smooth'
                });
            }, 1500); // Wait 1.5 seconds after typing
        }
    }
    typeWriter();

    // --- Scroll Event --- //
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // Activate stages
        stages.forEach(stage => {
            if (stage.offsetTop < scrollPosition + windowHeight / 1.5) {
                stage.classList.add('active');
            }
        });

        // Player movement (simple left-right movement)
        const journey = document.getElementById('journey');
        const scrollPercent = (scrollPosition / (journey.offsetHeight - windowHeight)) * 100;
        player.style.transform = `translateX(calc(-50% + ${scrollPercent * 2 - 100}px))`;
    });

    // --- Bullet Firing --- //
    player.addEventListener('click', (e) => {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        gameContainer.appendChild(bullet);

        const playerRect = player.getBoundingClientRect();
        bullet.style.left = `${playerRect.left + playerRect.width / 2 - 4}px`;
        bullet.style.top = `${playerRect.top - 8}px`;

        let velocityX = (Math.random() - 0.5) * 10; // Random horizontal velocity
        let velocityY = -10; // Upward velocity
        let bounces = 0;
        const maxBounces = 1; // Max 1 bounce

        function animateBullet() {
            let currentLeft = parseFloat(bullet.style.left);
            let currentTop = parseFloat(bullet.style.top);

            currentLeft += velocityX;
            currentTop += velocityY;

            // Bounce off walls
            if (currentLeft <= 0 || currentLeft >= window.innerWidth - 8) {
                if (bounces < maxBounces) {
                    velocityX *= -1;
                    bounces++;
                } else {
                    bullet.remove();
                    return;
                }
            }
            // Bounce off ceiling
            if (currentTop <= 0) {
                if (bounces < maxBounces) {
                    velocityY *= -1;
                    bounces++;
                } else {
                    bullet.remove();
                    return;
                }
            }

            bullet.style.left = `${currentLeft}px`;
            bullet.style.top = `${currentTop}px`;

            if (currentTop > window.innerHeight) {
                bullet.remove();
            } else {
                requestAnimationFrame(animateBullet);
            }
        }
        animateBullet();
    });

    // --- Project Modal --- //
    const modal = document.getElementById('project-modal');
    const terminals = document.querySelectorAll('.terminal');
    const closeButton = document.querySelector('.close-button');

    terminals.forEach(terminal => {
        terminal.addEventListener('click', () => {
            const projectKey = terminal.dataset.project;
            const data = projectData[projectKey];

            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-period').textContent = data.period;
            document.getElementById('modal-role').textContent = data.role;
            
            const achievementsList = document.getElementById('modal-achievements');
            achievementsList.innerHTML = '';
            data.achievements.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                achievementsList.appendChild(li);
            });

            const skillsContainer = document.getElementById('modal-skills');
            skillsContainer.innerHTML = '';
            data.skills.forEach(skill => {
                const span = document.createElement('span');
                span.textContent = skill;
                skillsContainer.appendChild(span);
            });

            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- Populate Career Section --- //
    const careerTimeline = document.querySelector('#career-section .timeline');
    careerData.forEach(career => {
        const item = document.createElement('div');
        item.classList.add('timeline-item');
        item.innerHTML = `
            <h3>${career.title}</h3>
            <p><strong>기간:</strong> ${career.period}</p>
            <p><strong>역할:</strong> ${career.role}</p>
            <h4>주요 업무 및 성과</h4>
            <ul>
                ${career.achievements.map(ach => `<li>${ach}</li>`).join('')}
            </ul>
        `;
        careerTimeline.appendChild(item);
    });

    // --- Populate Skill Section --- //
    const skillGridContainer = document.querySelector('#skills-section .skill-grid');
    skills.forEach(skill => {
        const icon = document.createElement('div');
        icon.classList.add('skill-icon');
        icon.textContent = skill;
        skillGridContainer.appendChild(icon);
    });
});