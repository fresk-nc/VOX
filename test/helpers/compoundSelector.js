export default function(selector) {
    return `.${selector.split(' ').join('.')}`;
}
