const yamlPath = '/dist/config.yml';

let anchors = {};

let anchorAnswers = {};

/**
 * Initializes the Reveal framework.
 */
const initReveal = () =>
{
    /* Initialize the Reveal framework. */
    Reveal.initialize({
        controls: false,
        controlsTutorial: false,
        disableLayout: true,
        hash: false,
        help: false,
        jumpToSlide: false,
        keyboard: false,
        overview: false,
        progress: false,
        slideNumber: false,
        transition: 'slide',
        transitionSpeed: 'default',
        touch: false,
        plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
    });
}

/**
 * Fetches the YAML file.
 *
 * @param url
 * @return {Promise<*>}
 */
const fetchYaml = async (url) =>
{
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const text = await response.text();

    return jsyaml.load(text);
}

/**
 * Create text to the given section.
 *
 * @param section
 * @param text
 */
const createText = (section, text) =>
{
    if (!text) {
        return;
    }

    let texts = text.split('\n');

    for (const text of texts) {
        const p = document.createElement('p');
        p.textContent = text;
        section.appendChild(p);
    }
}

/**
 * Creates the links to the given section.
 *
 * @param section
 * @param links
 */
const createLinks = (section, links) =>
{
    if (!links) {
        return;
    }

    const ul = document.createElement('ul');

    for (const key in links) {

        const value = links[key];
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = value;
        a.textContent = key;
        a.target = '_blank';

        li.appendChild(a);
        ul.appendChild(li);
    }

    section.appendChild(ul);
}

/**
 * Create question to the given section.
 *
 * @param section
 * @param question
 */
const createQuestion = (section, question) =>
{
    if (!question) {
        return;
    }

    const h2 = document.createElement('h2');

    h2.textContent = question;

    section.appendChild(h2);
}

/**
 * Creates the answers to the given section.
 *
 * @param section
 * @param answers
 * @param sectionId
 */
const createAnswers = (section, answers, sectionId) =>
{
    if (!answers) {
        return;
    }

    /* Replace answers with anchorAnswers. */
    if (typeof answers === "string" && anchorAnswers[answers] !== undefined) {
        answers = anchorAnswers[answers];
    }

    const ul = document.createElement('ul');

    ul.classList.add('answers');

    let counter = 1;
    for (const [answerText, answerData] of Object.entries(answers)) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        switch (true) {
            /* Anchor given. */
            case typeof answerData === "string" && anchors[answerData] !== undefined:
                const anchor = anchors[answerData];
                a.href = `#${anchor}`;
                break;

            /* Section given. */
            case typeof answerData === "string" && answerData.startsWith('section-'):
                a.href = `#${answerData}`;
                break;

            /* Calculate section. */
            default:
                const nextSectionId = sectionId + '-' + counter;
                a.href = `#${nextSectionId}`;
                break;
        }

        a.textContent = answerText;
        li.appendChild(a);
        ul.appendChild(li);

        counter++;
    }

    section.appendChild(ul);
}

/**
 * Collects the anchors from the given data.
 *
 * @param data
 * @param sectionId
 */
function collectAnchors(data, sectionId)
{
    let answers = data.answers;

    if (data.anchor) {
        anchors[data.anchor] = sectionId;
    }

    if (!answers) {
        return;
    }

    let counter = 1;

    let anchorAnswersTmp = {};
    for (const [answerText, answerData] of Object.entries(answers)) {

        const sectionIdTmp = sectionId + '-' + counter;
        anchorAnswersTmp[answerText] = sectionIdTmp;

        if (answerData) {
            collectAnchors(answerData, sectionIdTmp);
        }

        counter++;
    }

    if (data.anchor) {
        anchorAnswers[data.anchor] = anchorAnswersTmp;
    }
}

/**
 * Create a reveal section with given section data.
 *
 * @param sectionData
 * @param sectionId
 * @return {HTMLElement}
 */
const createSlide = (sectionData, sectionId) =>
{
    const section = document.createElement('section');
    section.setAttribute('data-transition', 'slide-out');
    section.setAttribute('data-auto-animate', null);

    section.id = sectionId;

    if (Array.isArray(sectionData.content)) {
        sectionData.content.forEach((content) => {
            for (const [type, data] of Object.entries(content)) {
                switch (type) {

                    /* Use answers from sectionData.answers block to slide. */
                    case 'answers':
                        createAnswers(section, sectionData.answers, sectionId);
                        break;

                    /* Add links to slide. */
                    case 'links':
                        createLinks(section, data);
                        break;

                    /* Add question to slide. */
                    case 'question':
                        createQuestion(section, data);
                        break;

                    /* Add text to slide. */
                    case 'text':
                        createText(section, data);
                        break;
                }
            }
        })
    }

    return section;
}

/**
 * Creates the reveal slides from the given data.
 *
 * @param data
 * @param slideContainer
 * @param sectionId
 */
const createSlides = (data, slideContainer, sectionId) =>
{
    const answers = data.answers;
    const slide = createSlide(data, sectionId);

    slideContainer.appendChild(slide);

    if (!answers) {
        return;
    }

    let counter = 1;
    for (const [answerText, answerData] of Object.entries(answers)) {
        if (!answerData) {
            continue;
        }

        createSlides(answerData, slideContainer, sectionId + '-' + counter++);
    }
}

/**
 * Build the reveal section from the given data.
 *
 * @param data
 * @return {HTMLDivElement}
 */
const getReveal = (data) =>
{
    const slideContainer = document.createElement('div');

    slideContainer.classList.add('slides');

    /* Create sections. */
    createSlides(data, slideContainer, 'section');

    return slideContainer;
}

/**
 * Fetches the YAML file and initializes the Reveal framework.
 *
 * @return {Promise<void>}
 */
const init = async () =>
{
    try {
        /* Load YAML data. */
        const data = await fetchYaml(yamlPath);

        /* Collect all anchors. */
        collectAnchors(data, 'section');

        /* Add reveal content. */
        document.querySelector('div.reveal').appendChild(getReveal(data));

        /* Initialize the Reveal framework. */
        initReveal();

    } catch (error) {
        console.error('Error loading YAML:', error);
    }
}

/* Starts the init function when dom is started. */
document.addEventListener('DOMContentLoaded', init);
