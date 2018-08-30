import $ from 'jquery';
import baron from 'baron';
import coreModule from 'app/core/core_module';

const scrollBarHTML = `
<div class="baron__track">
  <div class="baron__bar"></div>
</div>
`;

const scrollRootClass = 'baron baron__root';
const scrollerClass = 'baron__scroller';

export function geminiScrollbar() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      let scrollRoot = elem.parent();
      const scroller = elem;

      if (attrs.grafanaScrollbar && attrs.grafanaScrollbar === 'scrollonroot') {
        scrollRoot = scroller;
      }

      scrollRoot.addClass(scrollRootClass);
      $(scrollBarHTML).appendTo(scrollRoot);
      elem.addClass(scrollerClass);

      const scrollParams = {
        root: scrollRoot[0],
        scroller: scroller[0],
        bar: '.baron__bar',
        barOnCls: '_scrollbar',
        scrollingCls: '_scrolling',
        track: '.baron__track',
        direction: 'v',
      };

      const scrollbar = baron(scrollParams);

      scope.$on('$destroy', () => {
        scrollbar.dispose();
      });
    },
  };
}

coreModule.directive('grafanaScrollbar', geminiScrollbar);
