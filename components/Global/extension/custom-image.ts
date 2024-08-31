import { Node, mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '300px', // Default width
        parseHTML: (element) => element.getAttribute('width'),
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          }
        },
      },
      height: {
        default: 'auto', // Default height
        parseHTML: (element) => element.getAttribute('height'),
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          }
        },
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },
})

export default CustomImage
