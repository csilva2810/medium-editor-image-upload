var MediumEditorImageUpload = MediumEditor.Extension.extend({
    name: 'MediumEditorImageUpload',

    init: function () {
        var self = this;

        this.getEditorElements().forEach(function (element) {
            self.createButton(element);
        });

        this.subscribe('editableKeyup', this.handleCursorChange.bind(this));
        this.subscribe('editableClick', this.handleCursorChange.bind(this));
    },

    handleCursorChange: function (event, editable) {
        var button = this.getButton(editable);
        var position = this.getCaretPosition(editable);
        if (button.length && position) {
            this.showButton(button, position);
        }
    },

    handleImageUpload: function (e) {
        var image = e.target.files[0];
        var reader  = new FileReader();
        var validateImageType = function (name) {
            return /\.(jpe?g|png|gif)$/ig.test(name)
        }

        if (validateImageType(image.name)) {
            reader.onloadend = function () {
                document.execCommand('insertImage', false, reader.result);
            }

            if (image) {
                reader.readAsDataURL(image);
            }
        }
    },

    createButton(element) {
        var button = $('<button type="button" class="file-upload-button" contenteditable="false" />');
        var icon = $('<i class="fa fa-plus" />');
        var fileInput = $('<input type="file" class="file-input" accept=".png,.jpg,.jpeg,.gif" />');
        var imageTag = $('<image src="" />');

        button.on('click', function (e) {
            fileInput.click();
        });

        fileInput.on('change', this.handleImageUpload);

        button.append(icon);
        $(element).prepend(button);
    },

    getButton(element) {
        return $(element).find('.file-upload-button');
    },

    showButton(button, position) {
        button
            .css('top', position.top)
            .fadeIn();
    },

    getCaretPosition(element) {
        return $(element).caret('offset');
    }
});