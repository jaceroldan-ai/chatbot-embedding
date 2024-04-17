import { styles, CLOSE_ICON, MESSAGE_ICON } from "./assets.js";


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

    retrieveFormFields() {
        // TODO: placeholder
        // const url = 'http://localhost:8000/api-sileo/v1/board/embedded-card/create/';
        // const data = axios.get(url);

        return [
            {
                type: 'text',
                label: 'Label',
                id: 'text'
            }, {
                type: 'email',
                label: 'Label',
                id: 'email'
            }, {
                type: 'select',
                label: 'Label',
                id: 'select',
                options: [
                    {label: 'Option 1', value: 'option_1'},
                    {label: 'Option 2', value: 'option_2'},
                    {label: 'Option 3', value: 'option_3'},
                ]
            }, {
                type: 'number',
                label: 'Label',
                id: 'number',
            }, {
                type: 'date',
                label: 'Label',
                id: 'date',
            }, {
                type: 'time',
                label: 'Label',
                id: 'time',
            }, {
                type: 'textarea',
                label: 'Label',
                id: 'textarea',
            }, 
        ]
    }

    resolveFormFieldElements(listOfElements) {
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
                    'time'].indexOf(el.type) > -1) {
                let inputEl = document.createElement('input');
                inputEl.type = el.type;
                inputEl.id = el.value;
                inputEl.classList.add('block');
                labelContainer.appendChild(inputEl);
            }
            // Appending select type
            else if (el.type === 'select') {
                let selectEl = document.createElement('select');
                selectEl.id = el.value;
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
                textareaEl.id = el.value;
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
    createWidgetContent() {
        // Banner container setup
        const headerContainer = document.createElement('header');
        headerContainer.classList.add('banner-container');
        const bannerImageEl = document.createElement('img');
        bannerImageEl.src = 'assets/banner.jpg';
        bannerImageEl.style.width = '100%';
        const headerText = document.createElement('h1');
        headerText.innerText = 'Placeholder';
        headerContainer.appendChild(bannerImageEl);
        headerContainer.appendChild(headerText);
        this.widgetContainer.appendChild(headerContainer);

        // Form el setup
        const formEl = document.createElement('form');
        formEl.classList.add('funnel-form');

        // Form fields setup and appending or children
        const formFieldEls = this.resolveFormFieldElements(this.retrieveFormFields());

        // Appending of children nodes
        for (let el of formFieldEls) {
            formEl.appendChild(el);
        }

        // Appending of form to widgetContainer
        this.widgetContainer.appendChild(formEl);
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
