describe('Run jinny script', () => {
    it('run run run', () => {
        runBotCheckVacancy()
    })

    function runBotCheckVacancy() {
        cy.visit('https://djinni.co/jobs/?primary_keyword=QA&region=UKR&salary=2500')
        cy.get('ul.list-jobs').find('li').eq(0).then(vacancyItem => {
            cy.wrap(vacancyItem).find('div header div:nth-child(2)  div:nth-child(1) a').invoke('text')
                .then((firstVacancy) => {
                    cy.wrap(vacancyItem).find('div header div:nth-child(1) div a.mr-2').invoke('text')
                        .then((firstCompany) => {
                            checkNewVacancy(firstVacancy, firstCompany)
                        })
                })
        })
    }

    function checkNewVacancy(vacancyName: string, CompanyName: string) {
        cy.visit('https://djinni.co/jobs/?primary_keyword=QA&region=UKR&salary=2500')
        cy.get('ul.list-jobs').find('li').eq(0).then(vacancyItem => {
            cy.wrap(vacancyItem).find('div header div:nth-child(2)  div:nth-child(1) a').invoke('text')
                .then((nameVacancy) => {
                    cy.wrap(vacancyItem).find('div header div:nth-child(1) div a.mr-2').invoke('text')
                        .then((nameCompany) => {
                            cy.log('VacancyExp: ' + vacancyName + '   CompanyExp: ' + CompanyName)
                            cy.log('VacancyAct: ' + nameVacancy + '   CompanyAct: ' + nameCompany)
                            if (nameVacancy.trim().toLowerCase() != vacancyName.trim().toLowerCase()
                                && nameCompany.trim().toLowerCase() != CompanyName.trim().toLowerCase()) {
                            cy.log('MATCHED!')
                                play()
                                cy.wait(5000)
                                return;
                            }
                            cy.wait(10000)
                            checkNewVacancy(vacancyName, CompanyName)
                        })
                })
        })
    }

    function play() {
        cy.wait(2000)
        var audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-84577/zapsplat_emergency_siren_beep_warning_nuclear_meltdown_84854.mp3');
        audio.play();
    }
})