
'use strict';

export default {
  stories: [
    {id: 'test', name: 'IDEAS/TASKS'},
    {id: 'test2', name: 'IDEAS/TASKS2'},
  ],
  tasks: {
    test: [{id: 'test1', description: 'Do itkfjdsklgjlkfdjgklfdjgklfdjklgjfdlkgjklfdjgklfdjglkfdjlkgfdjlkgjfdlkgjfdlkgjfkldjglkfdjglfd', color: '#4FC3F7', completed: false}, {id: 'test15', description: 'Do it2', color: '#DCE775', completed: false}],
    test2: [{id: 'test233', description: 'Do it3', color: '#4FC3F7', completed: false}]
  },
  draggedStoryId: '',
  draggedTaskId: ''
};
