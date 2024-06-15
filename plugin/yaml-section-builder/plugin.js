/* YAML Path to configuration file. */
const yamlPath = '/plugin/yaml-section-builder/config.yml';

let anchors = {};

let anchorAnswers = {};

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
 * @param title
 */
const createTitle = (section, title) =>
{
    if (!title) {
        return;
    }

    const h2 = document.createElement('h2');

    h2.classList.add('title');
    h2.textContent = title;

    section.appendChild(h2);
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

    const div = document.createElement('div');

    div.classList.add('text');

    let texts = text.split('\n');

    for (const text of texts) {
        const p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);
    }

    section.appendChild(div);
}

/**
 * Create text to the given section.
 *
 * @param section
 * @param note
 */
const createNote = (section, note) =>
{
    if (!note) {
        return;
    }

    const div = document.createElement('div');

    div.classList.add('note');

    let notes = note.split('\n');

    for (const note of notes) {
        const p = document.createElement('p');
        p.textContent = note;
        div.appendChild(p);
    }

    section.appendChild(div);
}

/**
 * Creates the links to the given section.
 *
 * @param section
 * @param links
 */
const createLinks = (section, links) => {

    if (!links) {
        return;
    }

    const ul = document.createElement('ul');

    ul.classList.add('links');

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
const createQuestion = (section, question) => {

    if (!question) {
        return;
    }

    const h2 = document.createElement('h2');

    h2.classList.add('question');

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
const createAnswers = (section, answers, sectionId) =>  {

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
            case typeof answerData === "string" && answerData.startsWith('page-'):
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
 * Create a YouTube video to the given section.
 *
 * @param section
 * @param youtube
 */
const createYoutube = (section, youtube) => {

    if (!youtube) {
        return;
    }

    const iframe = document.createElement('iframe');

    iframe.src = youtube;
    iframe.title = 'YouTube video player';
    iframe.width = '80%';
    iframe.height = '50%';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullScreen = true;
    iframe.referrerPolicy ='strict-origin-when-cross-origin';

    section.appendChild(iframe);
}

/**
 * Collects the anchors from the given data.
 *
 * @param data
 * @param sectionId
 */
const collectAnchors = (data, sectionId) => {
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

                    /* Add note to slide. */
                    case 'note':
                        createNote(section, data);
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

                    /* Add title to slide. */
                    case 'title':
                        createTitle(section, data);
                        break;

                    /* Add a youtube video to slide. */
                    case 'youtube':
                        createYoutube(section, data);
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
const createRevealSlides = (data) =>
{
    const slideContainer = document.createElement('div');

    slideContainer.classList.add('slides');

    /* Create sections. */
    createSlides(data, slideContainer, 'page');

    return slideContainer;
}

/**
 * Plugin definition.
 *
 * @type {{init: ((function(*): Promise<void>)|*), id: string}}
 */
const Plugin =
{
    id: 'yaml-section-builder',
    init: async (deck) =>
    {
        /* Load YAML data. */
        const data = await fetchYaml(yamlPath);

        /* Collect all anchors. */
        collectAnchors(data, 'page');

        /* Create reveal slides. */
        let revealSlides = createRevealSlides(data);

        /* Target slides element. */
        let existingSlidesElement = document.querySelector('div.reveal div.slides');

        /* Add all reveal slides to target slides element. */
        if (existingSlidesElement && revealSlides) {
            while (revealSlides.lastChild) {
                existingSlidesElement.insertBefore(revealSlides.lastChild, existingSlidesElement.firstChild);
            }
        }
    }
};

export default Plugin;
