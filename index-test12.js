const styles = `
    @import url('./reset.css');
    @import url('./components/button.css');
    @import url('./components/input.css');
    @import url('./components/select.css');
    @import url('./components/thumbnail.css');

    .banner-container {
        position: relative;
    }

    .banner-container img {
        aspect-ratio: 3 / 1;
        object-fit: cover;
    }

    .banner-container h1 {
        position: absolute;
        top: 50%;
        left: 40px;
        transform: translateY(-50%);
        z-index: 2;
        color: var(--color-white);
    }

    .funnel-form {
        display: flex;
        flex-direction: column;
        row-gap: 24px;
        width: 100%;
        padding: 24px;
    }

    .funnel-form .label-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .funnel-form .label-container label {
        font-weight: 600;
        color: var(--color-secondary);
    }

    .widget__container * {
        box-sizing: border-box;
    }        
    h3, p, input {
        margin: 0;
        padding: 0;
    }
    .widget__container {
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        width: 400px;
        overflow: auto;
        right: 0;
        bottom: 75px;
        height: calc(100vh - 135px);
        position: absolute;
        transition: max-height .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
        background-color: var(--color-container);
        border-radius: 10px;
        box-sizing: border-box;
    }
    .widget__icon {
        font-size: 28px;
        cursor: pointer;
        position: absolute;
        transition: transform .3s ease;
    }
    .widget__hidden {
        transform: scale(0);
    }
    .button__container {
        border: none;
        background-color: var(--color-accent);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
    }
    .button__container:hover {
        background-color: var(--color-accent-hover);
    }
    .widget__container.hidden {
        max-height: 0px;
    }
    .widget__header {
        padding: 1rem 2rem 1.5rem;
        background-color: var(--color-primary);
        color: var(--color-white);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-align: center;
    }
    .widget__header h3 {
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 8px;
    }
    form {
        padding: 2rem 1rem 1.5rem;
    }
    form .form__field {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
    }
    .form__field label {
        margin-bottom: 8px;
        font-size: 14px;
    }
    .form__field input,
    .form__field textarea {
        border: 1px solid var(--border);
        border-radius: 3px;
        padding: 8px 10px;
        background-color: var(--white);
    }
    .form__field input {
        height: 48px;
    }
    .form__field textarea::placeholder {
        font-family: Helvetica, Arial ,sans-serif;
    }
    form button {
        height: 48px;
        border-radius: 6px;
        font-size: 18px;
        background-color: var(--color-primary);
        color: var(--color-white);
        border: 0;
        width: 100%;
        cursor: pointer;
    }
    form button:hover {
        background-color: rgba(0, 0, 0, 95%);
    }
`;

const MESSAGE_ICON = `
    <i class="icon mdi mdi-rocket-launch-outline" style="color: white;"></i>
`;

const CLOSE_ICON = `
    <i class="icon mdi mdi-close" style="color: white;"></i>
`;

class MessageWidget {
    constructor(position = "bottom-right") {
        this.position = this.getPosition(position);
        this.open = false;
        this.initialize();
        this.injectStyles();
    }

    position = "";
    open = false;
    widgetContainer = null;

    getPosition(position) {
        const [vertical, horizontal] = position.split("-");
        return {
        [vertical]: "30px",
        [horizontal]: "30px",
        };
    }

    async initialize() {
        /**
         * Create and append a div element to the document body
         */
        const container = document.createElement("div");
        container.style.position = "fixed";
        Object.keys(this.position).forEach(
        (key) => (container.style[key] = this.position[key])
        );
        document.body.appendChild(container);

        /**
         * Create a button element and give it a class of button__container
         */
        const buttonContainer = document.createElement("button");
        buttonContainer.classList.add("button__container");

        /**
         * Create a span element for the widget icon, give it a class of `widget__icon`, and update its innerHTML property to an icon that would serve as the widget icon.
         */
        buttonContainer.style = "display: flex; align-items: center; justify-content: center;"
        const widgetIconElement = document.createElement("span");
        widgetIconElement.innerHTML = MESSAGE_ICON;
        widgetIconElement.classList.add("widget__icon");
        this.widgetIcon = widgetIconElement;

        /**
         * Create a span element for the close icon, give it a class of `widget__icon` and `widget__hidden` which would be removed whenever the widget is closed, and update its innerHTML property to an icon that would serve as the widget icon during that state.
         */
        const closeIconElement = document.createElement("span");
        closeIconElement.innerHTML = CLOSE_ICON;
        closeIconElement.classList.add("widget__icon", "widget__hidden");
        this.closeIcon = closeIconElement;

        /**
         * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
         */
        buttonContainer.appendChild(this.widgetIcon);
        buttonContainer.appendChild(this.closeIcon);
        buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

        /**
         * Create a container for the widget and add the following classes:- `widget__hidden`, `widget__container`
         */
        this.widgetContainer = document.createElement("div");
        this.widgetContainer.classList.add("widget__hidden", "widget__container");
    
        /**
         * Append the widget's content and the button to the container
        */
        container.appendChild(this.widgetContainer);
        container.appendChild(buttonContainer);
        document.getElementById('submit-hqzen-btn').addEventListener('click', event => {
            event.preventDefault();

            const url = 'http://localhost:8000/api-sileo/v1/board/embedded-card/create/';
            const subject = document.getElementById('floating-subject').value;
            const name = document.getElementById('floating-name').value;
            const email = document.getElementById('floating-email').value;
            const message = document.getElementById('floating-message').value;
    
            const data = {
                title: subject,
                description: JSON.stringify({'ops': [
                    {'insert': `Name: ${name}`, 'attributes': {'fs': '24px'}}, {'insert': '\n'},
                    {'insert': `Email: ${email}`, 'attributes': {'fs': '24px'}}, {'insert': '\n'},
                    {'insert': `Message: ${message}`, 'attributes': {'fs': '24px'}}, {'insert': '\n'},
                ]}),
                column: 213,
                creator: 84202,
                is_public: true,
            };

            const form = new FormData();  

            for (let item in data) {
                form.append(item, data[item]);
            }

                axios.post(url, form);
            })
    }

    /**
     * 
     * @param {object} data 
     * Can take in one of 'text', 'email', 'number', 'date', 'time', 'textarea',
     * 'select'
     * 
     * One caveat here is that this does not handle attachments just yet.
     * @returns array of formatted element fields
     */
    extractQuestionsFromSections(data) {
        const questionData = data.form_sections.flatMap(
            section => section.form_questions
        ).filter(q => q.question_type_display !== 'Attachment');
        const formattedFields = questionData.map(q => {
            const label = q.text;
            const id = q.pk;
            let type, options;
            if (q.question_type_display === 'Paragraph') {
                type = 'textarea';
            } else if (q.question_type_display === 'Datetime') {
                type = 'date';
            } else if (q.question_type_display === 'Short Text') {
                type = 'text';
            } else if (['Dropdown', 'Switch'].includes(q.question_type_display)) {
                type = 'select';
                if (q.question_type_display === 'Dropdown') {
                    options = q.linked_choices.map(c => {
                        return {label: c.text, value: c.text}
                    });
                } else {
                    options = [
                        {label: 'Yes', value: 'Yes'},
                        {label: 'No', value: 'No'}
                    ];
                }
            }
            return {
                label,
                type,
                id,
                options,
            }
        });
        return formattedFields;
    }

    retrieveFormFields() {
        // TODO: how would we identify which
        const extractQuestionsFromSections = this.extractQuestionsFromSections;
        const self = this;

        return new Promise((resolve, reject) => {
            // accessed through data-param1
            const scriptTags = document.querySelectorAll('script');
            let scriptTag;
            for (let item of scriptTags) {
                if (item.attributes.getNamedItem('data-param'))
                    scriptTag = item;
            }
            
            let pk = String(482);
            
            if (scriptTag && scriptTag.attributes.getNamedItem('data-param')) {
                pk = String(scriptTag.attributes.getNamedItem('data-param').value);
            }
            console.log(pk);
            const baseUrl = 'http://localhost:8000/api-sileo/v1/hqzen/engagement-form-document-resource/get/';
            const completeUrl = baseUrl + pk;
    
            const req = new XMLHttpRequest();

            req.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    try {
                        const response = JSON.parse(this.responseText);
                        const formFields = extractQuestionsFromSections(response.data);
                        console.log('formfields', formFields);
                        console.log(response.data);
                        self.column = response.data.owner.columns.filter(c => c.header === 'To Do')[0];
                        self.formFields = formFields;
                        resolve(formFields);
                        console.log('resolved');
                    } catch (e) {
                        reject(e);
                    }
                }
            }
            req.open('GET', completeUrl);
            req.send();
        })
    }

    resolveFormFieldElements(listOfElements) {
        console.log('elements', listOfElements);
        const retList = [];

        for (let el of listOfElements) {
            let labelContainer = document.createElement('div');
            labelContainer.classList.add('label-container');
            let labelEl = document.createElement('label');
            labelEl.innerText = el.label;
            labelEl.htmlFor = el.id;
            labelContainer.appendChild(labelEl);

            // Appending text, email, number, date, and time
            // input types
            if ([
                    'text',
                    'email',
                    'number',
                    'date',
                    'time'].includes(el.type)) {
                let inputEl = document.createElement('input');
                inputEl.type = el.type;
                inputEl.id = el.id;
                inputEl.classList.add('block');
                labelContainer.appendChild(inputEl);
            }
            // Appending select type
            else if (el.type === 'select') {
                let selectEl = document.createElement('select');
                selectEl.id = el.id;
                selectEl.classList.add('block');
                for (let option of el.options) {
                    let optionEl = document.createElement('option');
                    optionEl.value = option.value;
                    optionEl.innerText = option.label;
                    selectEl.appendChild(optionEl);
                }
                labelContainer.appendChild(selectEl);
            }
            // Appending textarea type for longform
            else if (el.type === 'textarea') {
                let textareaEl = document.createElement('textarea');
                textareaEl.cols = '30';
                textareaEl.rows = '10';
                textareaEl.classList.add('block');
                textareaEl.id = el.id;
                labelContainer.appendChild(textareaEl);
            }

            retList.push(labelContainer);
        }

        return retList;
    }

    /**
     * Fetch and construct the form.
     * This is called every time the form is opened or closed.
     */
    async createWidgetContent() {
        // Banner container setup
        const headerContainer = document.createElement('header');
        headerContainer.classList.add('banner-container');
        const bannerImageEl = document.createElement('img');
        bannerImageEl.src = 'https://cdn.jsdelivr.net/gh/jaceroldan-ai/chatbot-embedding@main/assets/banner.jpg';
        bannerImageEl.style.width = '100%';
        const headerText = document.createElement('h1');
        headerContainer.appendChild(bannerImageEl);
        headerContainer.appendChild(headerText);
        this.widgetContainer.appendChild(headerContainer);
        
        // Form el setup
        const formEl = document.createElement('form');
        formEl.classList.add('funnel-form');
        
        // Form fields setup and appending or children
        const fields = await this.retrieveFormFields();
        const formFieldEls = this.resolveFormFieldElements(fields);
        // TODO (jaceroldan@bposeats.com): For May 2024 sprint
        // headerText.innerText = 'Placeholder';

        // Appending of children nodes
        for (let el of formFieldEls) {
            formEl.appendChild(el);
        }

        // Appending of form to widgetContainer
        const buttonEl = document.createElement('button');
        buttonEl.classList.add('accent');
        buttonEl.classList.add('block');
        buttonEl.innerText = 'Get started!';
        buttonEl.addEventListener('click', event => {
            event.preventDefault();

            const url = 'http://localhost:8000/api-sileo/v1/hqzen/internal-card/create/';
            const descriptionValues = this.formFields.flatMap(ff => {
                const id = ff.id;
                const label = ff.value;
                const value = document.getElementById(id).value;

                return [{
                    'insert': `${label}: ${value}`,
                    'attributes': {'fs': '24px'}
                }, {
                    'insert': '\n'
                }];
            });

            const data = {
                title: 'New embedded engagement form issue',
                description: JSON.stringify({'ops': descriptionValues}),
                column: this.column.pk,
                creator: 84202,
                is_public: true,
                total_points: 0,
            }
            
            const form = new FormData();

            for (let item in data) {
                form.append(item, data[item]);
            }

            this.createCard(url, form);
        });
        formEl.appendChild(buttonEl);
        this.widgetContainer.appendChild(formEl);
    }

    createCard(url, form) {
        const self = this;
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.onreadystatechange = function() {
                console.log(this.status);
                if (this.readyState === 4 && this.status === 201) {
                    try {
                        const response = JSON.parse(this.responseText);
                        console.log(response);
                        resolve(response.data);
                        // TODO: Need a better V2
                        alert('card created!');
                        self.cleanForm();
                    } catch (e) {
                        reject(e);
                    }
                }
            }
            req.open('POST', url);
            req.send(form);
        });
    }

    cleanForm() {
        this.formFields.forEach(ff => {
            const id = ff.id;
            const el = document.getElementById(id);
            console.log('el', el);
            el.value = '';
        });
    }

    injectStyles() {
        const styleTag = document.createElement("style");
        styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
        document.head.appendChild(styleTag);
    }

    toggleOpen() {
        this.open = !this.open;
        if (this.open) {
            this.createWidgetContent();
            this.widgetIcon.classList.add("widget__hidden");
            this.closeIcon.classList.remove("widget__hidden");
            this.widgetContainer.classList.remove("widget__hidden");
        } else {
            this.widgetIcon.classList.remove("widget__hidden");
            this.closeIcon.classList.add("widget__hidden");
            this.widgetContainer.classList.add("widget__hidden");
            this.widgetContainer.innerHTML = '';
        }
    }
}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
