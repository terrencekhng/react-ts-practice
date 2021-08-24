import { useEffect, useCallback } from 'react';
import './index.scss';
import { getPseudoStyle, getStyle } from '../../utils/elements';
import { useRef, useState } from 'react';

const CustomCheckBox = (): JSX.Element => {

  const [state, setState] = useState<{ activeThumb: HTMLInputElement | null; recentlyDragged: Boolean; }>({
    activeThumb: null,
    recentlyDragged: false
  });
  const [switches] = useState<WeakMap<HTMLElement, any>>(new WeakMap());

  const guiSwitchEl = useRef<HTMLLabelElement>(null);

  const dragInit = (event: PointerEvent): void => {
    if ((event.target as HTMLInputElement).disabled) return;

    setState(state => ({
      ...state,
      activeThumb: event.target as HTMLInputElement
    }));
  };

  const determineChecked = useCallback((): boolean => {
    if (state.activeThumb && state.activeThumb.parentElement) {
      let { bounds } = switches.get(state.activeThumb.parentElement);
      let curPos = Math.abs(parseInt(state.activeThumb.style.getPropertyValue('--thumb-position')));
      if (!curPos) {
        curPos = state.activeThumb.checked ? bounds.lower : bounds.upper;
      }
      return curPos >= bounds.middle;
    }
    return true;
  }, [state.activeThumb, switches]);

  useEffect(() => {
    if (guiSwitchEl.current) {

      let checkbox = guiSwitchEl.current.querySelector('input');
      if (checkbox) {
        const thumbsize = getPseudoStyle(checkbox, 'width');
        const padding = getStyle(checkbox, 'padding-left') + getStyle(checkbox, 'padding-right');
        switches.set(guiSwitchEl.current, {
          thumbsize,
          padding,
          bounds: {
            lower: 0,
            middle: (checkbox.clientWidth - padding) / 4,
            upper: checkbox.clientWidth - thumbsize - padding
          }
        })
      }

    }
  }, [state.activeThumb, switches]);

  // drag init event
  useEffect(() => {
    if (guiSwitchEl.current) {
      let checkbox = guiSwitchEl.current.querySelector('input');
      if (checkbox) {
        checkbox.addEventListener('pointerdown', dragInit);
      }
    }
  }, []);

  // drag end event
  useEffect(() => {
    const dragEnd = (): void => {
      if (!state.activeThumb) return;

      if (state.activeThumb) {
        const newActiveThumb = state.activeThumb;
        newActiveThumb.checked = determineChecked();
        setState(state => ({
          ...state,
          activeThumb: newActiveThumb
        }));

        if (state.activeThumb.indeterminate) {
          newActiveThumb.indeterminate = false;
          setState(state => ({
            ...state,
            activeThumb: newActiveThumb
          }))
        }

        state.activeThumb.style.removeProperty('--thumb-transition-duration');
        state.activeThumb.style.removeProperty('--thumb-position');
        setState(state => ({
          ...state,
          activeThumb: null
        }))
      }

      padRelease();
    };
    if (guiSwitchEl.current) {
      let checkbox = guiSwitchEl.current.querySelector('input');
      if (checkbox) {
        checkbox.addEventListener('pointerup', dragEnd)
        return () => {
          checkbox?.removeEventListener('pointerup', dragEnd);
        }
      }
    }
  }, [state.activeThumb, determineChecked]);

  // dragging event
  useEffect(() => {
    const dragging = (event: PointerEvent): void => {
      if (!state.activeThumb) return;

      if (state.activeThumb.parentElement) {
        let { thumbsize, bounds, padding } = switches.get(state.activeThumb.parentElement);
        let directionality = getStyle(state.activeThumb, '--isLTR');

        let track = (directionality === -1)
          ? state.activeThumb.clientWidth * -1 + thumbsize + padding
          : 0;

        let pos = Math.round(event.offsetX - thumbsize / 2);

        if (pos < bounds.lower) pos = 0;
        if (pos > bounds.upper) pos = bounds.upper;

        state.activeThumb.style.setProperty('--thumb-position', `${track + pos}px`);
      }
    };
    if (state.activeThumb) {
      state.activeThumb?.addEventListener('pointermove', dragging);
      state.activeThumb?.style.setProperty('--thumb-transition-duration', '0s');
      return () => {
        state.activeThumb?.removeEventListener('pointermove', dragging);
      }
    }
  }, [state.activeThumb, switches]);

  // switch click
  useEffect(() => {
    const labelClick = (event: globalThis.MouseEvent): void => {
      if (state.recentlyDragged
        || !(event.target as HTMLLabelElement).classList.contains('gui-switch')
        || (event.target as HTMLLabelElement).querySelector('input')?.disabled) {
        return;
      }

      let checkbox = (event.target as HTMLLabelElement).querySelector('input');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      event.preventDefault();
    }
    const curGuiSwitchEl = guiSwitchEl.current;
    if (curGuiSwitchEl) {
      curGuiSwitchEl.addEventListener('click', labelClick);
      return () => {
        curGuiSwitchEl.removeEventListener('click', labelClick);
      }
    }
  }, [state.recentlyDragged]);

  // prevent bubbles
  useEffect(() => {
    if (guiSwitchEl.current) {
      let checkbox = guiSwitchEl.current.querySelector('input');
      if (checkbox) {
        checkbox.addEventListener('click', preventBubbles);
        return () => {
          checkbox?.removeEventListener('click', preventBubbles);
        }
      }
    }
  });

  const padRelease = (): void => {
    setState(state => ({
      ...state,
      recentlyDragged: true
    }))

    window.setTimeout(() => {
      setState(state => ({
        ...state,
        recentlyDragged: false
      }))
    }, 300);
  }

  const preventBubbles = (event: Event): void => {
    if (state.recentlyDragged) {
      event.preventDefault();
      event.stopPropagation();
    }
  }



  return (
    <div>
      <label htmlFor="switch" className="gui-switch" ref={guiSwitchEl}>
        Label text
        <input type="checkbox" role="switch" id="switch" />
      </label>
    </div>
  )
}

export default CustomCheckBox;