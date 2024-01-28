import { useMemo, type HTMLProps, type ReactElement, type ReactNode, ChangeEvent, FormEvent, CSSProperties, KeyboardEvent } from 'react';
import {
  type AnimatedProp,
  Animated,
  FrameSVGOctagon,
  useBleeps,
  cx,
  Illuminator
} from '@arwes/react';
import PropTypes from 'prop-types';
import { generateStyles } from './TextField.style';
import { useTheme } from '@emotion/react';
import { Theme } from '@arwes/design';
import * as classes from './TextField.css';


export type BleepNames =
  | 'click'
  | 'open'
  | 'close'
  | 'error'
  | 'info'
  | 'intro'
  | 'content'
  | 'type'
  | 'assemble';

export type TEXT_FIELD_TYPE = 'text' | 'email' | 'search' | 'password' | 'tel' | 'url' | 'number';
export const TEXT_FIELD_TYPE_VALUES: TEXT_FIELD_TYPE[] = ['text', 'email', 'search', 'password', 'tel', 'url', 'number'];


interface TextFieldProps<E extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> {
  className?: string
  animated?: AnimatedProp
  tabIndex?: number
  title?: string
  size?: 'small' | 'medium'
  frame?: 'simple' | 'hexagon'
  onHoverAnimateIcons?: boolean
  onClick?: () => void
  onPress?: (event: KeyboardEvent) => void
  children: ReactNode
  multiline?: boolean
  type?: TEXT_FIELD_TYPE
  name?: string
  placeholder?: string
  autoComplete?: string
  autoFocus?: boolean
  readOnly?: boolean
  spellCheck?: boolean
  required?: boolean
  disabled?: boolean
  defaultValue?: string | number
  value?: string | number
  onChange?: (event: ChangeEvent<E>) => void
  onInput?: (event: FormEvent<E>) => void
  inputProps?: HTMLProps<E>
  hideLines?: boolean
  palette?: string
  style?: CSSProperties
}

const TextField = (props: TextFieldProps): ReactElement => {
  const {
    palette,
    animated,
    className,
    tabIndex,
    title,
    size = 'medium',
    frame = 'hexagon',
    onHoverAnimateIcons,
    onClick,
    children,
    multiline = true,
    type = 'text',
    name,
    placeholder,
    autoComplete,
    autoFocus,
    readOnly,
    spellCheck,
    required,
    disabled,
    defaultValue,
    value,
    onChange,
    onInput,
    inputProps,
    hideLines,
    style,
    onPress,
    ...otherProps
  } = props;

  const bleeps = useBleeps<BleepNames>();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => generateStyles(theme, { palette }), [theme, palette]);
  return (<Animated
    as='article'
    className={cx(classes.root, className)}
  // animated={animated}
  >
    {frame === 'simple' && (
      <div className={cx(classes.frameElement, classes.frameSimpleDeco)} />
    )}
    {frame === 'hexagon' && (
      <div className={cx(classes.frameElement, classes.frameHexagonClip) + (multiline ? " h-48" : "")}>
        <Illuminator
          className={classes.frameHexagonIlluminator}
          color='hsl(60 50% 90% / 8%)'
          size={200}
        />
        <FrameSVGOctagon squareSize={12} leftBottom={false} rightTop={false} />
        <Animated<HTMLInputElement, HTMLProps<HTMLInputElement>>
          {...otherProps}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          readOnly={readOnly}
          spellCheck={spellCheck}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onKeyUp={onPress}
          onInput={onInput}
          {...inputProps}
          as={multiline ? 'textarea' : 'input'}
          type={multiline ? undefined : type}
          className={cx('arwes-text-field__input', inputProps?.className)}
          style={styles.input as any}
          // animated={{
          //   exiting: ({ targets }) => {
          //     // If the input has focus while invisibile, user would be able to type on it.
          //     (targets as HTMLElement).blur();
          //   }
          // }}
          onChange={(e) => {
            bleeps.click?.play();
            onChange?.(e as any);
          }}
          onClick={() => {
            onClick?.();
            bleeps.intro?.play();
          }}
        />
      </div>
    )}
  </Animated>);
};


TextField.propTypes = {
  multiline: PropTypes.bool,
  type: PropTypes.oneOf(TEXT_FIELD_TYPE_VALUES),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  spellCheck: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  inputProps: PropTypes.object,
  hideLines: PropTypes.bool,
  palette: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any
};

export type { TextFieldProps };

export { TextField };