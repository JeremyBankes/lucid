export default {
    toSlug(string) {
        string = string.replace(/[^a-z0-9]+/gi, '-');
        string = string.replace(/(?!^)(?<!-)(?=[A-Z])/g, '-');
        string = string.replace(/^-|-$/g, '');
        return string.toLowerCase();
    },
    toCamel(string) {
        string = string.replace(/[^A-Za-z0-9]+/g, ' ').trim().toLowerCase();
        string = string.split(/ /g).map((piece, index) => {
            if (index > 0) {
                return piece.charAt(0).toUpperCase() + piece.substring(1);
            }
            return piece;
        }).join('');
        return string;
    }
};
