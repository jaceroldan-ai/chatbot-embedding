export const styles = `
    @import url('./reset.css');
    @import url('./components/button.css');
    @import url('./components/input.css');
    @import url('./components/select.css');
    @import url('./components/thumbnail.css');

    #app {
        max-width: 480px;
        margin: 0 auto;
        padding: 2rem;
    }

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
        right: -25px;
        bottom: 75px;
        position: absolute;
        transition: max-height .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
        background-color: #e6e6e6a6;
        border-radius: 10px;
        box-sizing: border-box;
    }
    .widget__icon {
        font-size: 20px;
        cursor: pointer;
        position: absolute;
        transition: transform .3s ease;
    }
    .widget__hidden {
        transform: scale(0);
    }
    .button__container {
        border: none;
        background-color: #0f172a;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
    }
    .widget__container.hidden {
        max-height: 0px;
    }
    .widget__header {
        padding: 1rem 2rem 1.5rem;
        background-color: #000;
        color: #fff;
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
        border: 1px solid #000000ad;
        border-radius: 3px;
        padding: 8px 10px;
        background-color: #fff;
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
        background-color: #000;
        color: #fff;
        border: 0;
        width: 100%;
        cursor: pointer;
    }
    form button:hover {
        background-color: rgba(0, 0, 0, 95%);
    }
`;

export const MESSAGE_ICON = `
    <i class="icon mdi mdi-rocket-launch-outline" style="color: white;"></i>
`;

export const CLOSE_ICON = `
    <i class="icon mdi mdi-close" style="color: white;"></i>
`;