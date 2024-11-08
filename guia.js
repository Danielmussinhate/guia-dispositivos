// Guia Connect Line Formulário
document.getElementById('guideForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const age = document.getElementById('age').value;
    const device = document.getElementById('device').value;

    if (isNaN(weight) || !age || !device) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Funções para determinar as recomendações com base no dispositivo
    let recommendation = '';

    switch(device) {
        case 'cateter_aspiracao':
            recommendation = getCateterAspiracao(weight);
            break;
        case 'cateter_cvc':
            recommendation = getCateterCVC(age);
            break;
        case 'dreno_torax':
            recommendation = getDrenoTorax(weight);
            break;
        case 'laringoscopio':
            recommendation = getLaringoscopio(age);
            break;
        case 'mascara_laringea':
            recommendation = getMascaraLaringea(age);
            break;
        case 'pas_desfibrilador':
            recommendation = getPasDesfibrilador(age);
            break;
        case 'sonda_foley':
            recommendation = getSondaFoley(age);
            break;
        case 'sonda_nasogastrica':
            recommendation = getSondaNasogastrica(age, weight);
            break;
        case 'sonda_nasoenteral':
            recommendation = getSondaNasoenteral(age);
            break;
        case 'distancia_sonda':
            recommendation = getDistanciaSonda(age);
            break;
        case 'tubo_traqueal':
            recommendation = getTuboTraqueal(age);
            break;
        case 'sonda_guedel':
            recommendation = getSondaGuedel(age);
            break;
        default:
            recommendation = 'Dispositivo não encontrado.';
    }

    // Atualizar o Resultado
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p><strong>Recomendação:</strong> ${recommendation}</p>`;
    resultDiv.classList.add('show');

    // Atualizar a Tabela de Recomendações
    const tableBody = document.querySelector('#recommendationTable tbody');
    const newRow = document.createElement('tr');

    const deviceCell = document.createElement('td');
    deviceCell.setAttribute('data-label', 'Dispositivo');
    deviceCell.textContent = formatDeviceName(device);

    const recommendationCell = document.createElement('td');
    recommendationCell.setAttribute('data-label', 'Recomendação');
    recommendationCell.textContent = recommendation;

    newRow.appendChild(deviceCell);
    newRow.appendChild(recommendationCell);

    tableBody.appendChild(newRow);
});

// Funções de recomendação para Guia Connect Line
function getCateterAspiracao(weight) {
    if (weight < 1) return '6F';
    if (weight >= 1 && weight < 2) return '6-8F';
    if (weight >= 2 && weight < 11) return '8F';
    if (weight >= 11 && weight <= 130) return '12-14F';
    return 'Não disponível para este peso.';
}

function getCateterCVC(age) {
    if (age.startsWith('prematuro')) return 'UVC F';
    switch(age) {
        case '1m':
            return 'UVC F';
        case '1-2m':
        case '3-4m':
        case '4-6m':
        case '6-12m':
        case '1a':
            return '3F';
        case '2a':
            return '4F';
        case '3-4a':
        case '5-6a':
        case '6-9a':
            return '4-5F';
        case '10-11a':
            return '5-8F';
        default:
            return 'Não disponível para esta idade.';
    }
}

function getDrenoTorax(weight) {
    if (weight < 1) return '8-12F';
    if (weight >= 1 && weight < 3) return '8-12F';
    if (weight >= 3 && weight < 4) return '10-12F';
    if (weight >= 4 && weight < 5) return '10-12F';
    if (weight >= 5 && weight < 7) return '10-14F';
    if (weight >= 7 && weight < 9) return '12-16F';
    if (weight >= 10 && weight < 11) return '16-20F';
    if (weight >= 11 && weight < 24) return '20-24F';
    if (weight >= 24 && weight < 30) return '28-32F';
    if (weight >= 30 && weight < 37) return '32-40F';
    if (weight >= 37 && weight <= 130) return '32-42F';
    return 'Não disponível para este peso.';
}

function getLaringoscopio(age) {
    if (age.startsWith('prematuro')) {
        if (age === 'prematuro <28') return '00 reta';
        return '0 reta';
    }
    switch(age) {
        case '1m':
            return '0 reta';
        case '1-2m':
        case '3-4m':
        case '4-6m':
        case '6-12m':
        case '1a':
        case '2a':
            return '1 reta/curva';
        case '3-4a':
        case '5-6a':
        case '6-9a':
            return '2 reta/curva';
        case '10-11a':
        case '12a':
        case '13a':
        case '14a':
        case '15a':
            return '3 reta/curva';
        default:
            return 'Não disponível para esta idade.';
    }
}

function getMascaraLaringea(age) {
    if (age.startsWith('prematuro')) {
        return 'Volume cuff: 2 a 5 ml';
    }
    switch(age) {
        case '1m':
            return 'Tamanho 1, Volume Cuff: 2 a 5 ml';
        case '1-2m':
            return 'Tamanho 1,5, Volume Cuff: 7 a 10 ml';
        case '3-4m':
        case '4-6m':
        case '6-12m':
            return 'Tamanho 2, Volume Cuff: 7 a 10 ml';
        case '1a':
            return 'Tamanho 2-2,5, Volume Cuff: 14 ml';
        case '2a':
            return 'Tamanho 2, Volume Cuff: 14 ml';
        case '3-4a':
        case '5-6a':
        case '6-9a':
            return 'Tamanho 3, Volume Cuff: 15 a 20 ml';
        case '10-11a':
            return 'Tamanho 4, Volume Cuff: 25 a 30 ml';
        default:
            return 'Não disponível para esta idade.';
    }
}

function getPasDesfibrilador(age) {
    if (age.startsWith('prematuro') || age === '1m') {
        return 'Não se utiliza';
    }
    const infantAges = ['1-2m', '3-4m', '4-6m', '6-12m'];
    const adultAges = ['1a', '2a', '3-4a', '5-6a', '6-9a', '10-11a', '12a', '13a', '14a', '15a', '16a-19a', '20a-25a', '26a-35a', '36a-45a', '46a-55a', '56a-65a', '66a-75a', '76a-85a', '86a-95a'];

    if (infantAges.includes(age)) {
        return 'Pás infantis';
    }
    if (adultAges.includes(age)) {
        return 'Pás adulto';
    }
    return 'Não disponível para esta idade.';
}

function getSondaFoley(age) {
    if (age.startsWith('prematuro')) {
        return '5-8F';
    }
    switch(age) {
        case '1m':
        case '1-2m':
        case '3-4m':
        case '4-6m':
        case '6-12m':
            return '8F';
        case '1a':
            return '10F';
        case '2a':
        case '3-4a':
        case '5-6a':
        case '6-9a':
            return '12F';
        case '10-11a':
            return '13F';
        default:
            return 'Não disponível para esta idade.';
    }
}

function getSondaNasogastrica(age, weight) {
    if (age.startsWith('prematuro')) {
        switch(age) {
            case 'prematuro <28':
                return '6F';
            case 'prematuro 28-34':
            case 'prematuro 34-37':
                return '8F';
            default:
                return 'Não disponível para esta idade.';
        }
    }
    switch(age) {
        case '1m':
        case '1-2m':
        case '3-4m':
        case '4-6m':
            return '8F';
        case '6-12m':
            return '10F';
        case '1a':
        case '2a':
            return '10-12F';
        case '3-4a':
        case '5-6a':
            return '12F';
        case '6-9a':
            return '14-18F';
        case '10-11a':
            return '15-18F';
        default:
            return 'Não disponível para esta idade.';
    }
}

function getSondaNasoenteral(age) {
    if (age.startsWith('prematuro')) {
        switch(age) {
            case 'prematuro <28':
            case 'prematuro 28-34':
                return '4F';
            case 'prematuro 34-37':
                return '5F';
            default:
                return 'Não disponível para esta idade.';
        }
    }
    switch(age) {
        case '1m':
        case '1-2m':
        case '3-4m':
        case '4-6m':
        case '6-12m':
            return '5F';
        case '1a':
            return '7,5F';
        case '2a':
        case '3-4a':
        case '5-6a':
        case '6-9a':
            return '8F';
        case '10-11a':
        case '12a':
        case '13a':
        case '14a':
        case '15a':
            return '12F';
        default:
            return 'Não disponível para esta idade.';
    }
}

function getDistanciaSonda(age) {
    if (age.startsWith('prematuro')) {
        switch(age) {
            case 'prematuro <28':
                return '13-21 cm';
            case 'prematuro 28-34':
                return '21-26 cm';
            case 'prematuro 34-37':
                return '23-34 cm';
            default:
                return 'Não disponível para esta idade.';
        }
    }
    switch(age) {
        case '1m':
        case '1-2m':
        case '3-4m':
        case '4-6m':
            return '23-34 cm';
        case '6-12m':
            return '30-40 cm';
        case '1a':
            return '40 cm';
        case '2a':
        case '3-4a':
        case '5-6a':
        case '6-9a':
            return '60 cm';
        case '10-11a':
            return '105 cm';
        case '12a':
        case '13a':
        case '14a':
        case '15a':
            return '120 cm';
        default:
            return 'Não disponível para esta idade.';
    }
}

function getTuboTraqueal(age) {
    if (age.startsWith('prematuro')) {
        switch(age) {
            case 'prematuro <28':
                return '2,5 mm sem cuff';
            case 'prematuro 28-34':
                return '2,5-3,0 mm sem cuff';
            case 'prematuro 34-37':
                return '3,0-3,5 mm sem cuff';
            default:
                return 'Não disponível para esta idade.';
        }
    }
    switch(age) {
        case '1m':
        case '1-2m':
        case '3-4m':
        case '4-6m':
        case '6-12m':
            return '3,5 mm sem cuff';
        case '1a':
            return '4,0 mm sem cuff';
        case '2a':
            return '4,5 mm sem cuff';
        case '3-4a':
            return '5,0 mm sem cuff';
        case '5-6a':
            return '5,5 mm sem cuff';
        case '6-9a':
            return '6,0 mm sem cuff';
        case '10-11a':
            return '6,5 mm sem cuff';
        case '12a':
        case '13a':
            return '6,5-7,0 mm sem cuff';
        default:
            return '7,0-7,5 mm sem cuff';
    }
}

function getSondaGuedel(age) {
    switch(age) {
        case '1a':
            return 'Tamanho 000';
        case '2a':
        case '3-4a':
        case '5-6a':
            return 'Tamanho 00';
        case '6-9a':
        case '10-11a':
        case '12a':
            return 'Tamanho 0';
        case '16a-19a':
        case '20a-25a':
        case '26a-35a':
        case '36a-45a':
            return 'Tamanho 1';
        case '46a-55a':
        case '56a-65a':
            return 'Tamanho 2';
        case '66a-75a':
            return 'Tamanho 3';
        case '76a-85a':
            return 'Tamanho 4';
        case '86a-95a':
            return 'Tamanho 5';
        default:
            return 'Não disponível para esta idade.';
    }
}

// Função para formatar o nome do dispositivo
function formatDeviceName(device) {
    const deviceNames = {
        'cateter_aspiracao': 'Cateter de Aspiração',
        'cateter_cvc': 'Cateter Venoso Central (CVC)',
        'dreno_torax': 'Dreno de Tórax',
        'laringoscopio': 'Lâmina de Laringoscópio',
        'mascara_laringea': 'Máscara Laríngea',
        'pas_desfibrilador': 'Pás Desfibrilador',
        'sonda_foley': 'Sonda de Foley',
        'sonda_nasogastrica': 'Sonda Nasogástrica',
        'sonda_nasoenteral': 'Sonda Nasoenteral',
        'distancia_sonda': 'Distância de Inserção da Sonda Enteral',
        'tubo_traqueal': 'Tubo Traqueal (mm)',
        'sonda_guedel': 'Sonda Guedel'
    };
    return deviceNames[device] || 'Dispositivo Desconhecido';
}
