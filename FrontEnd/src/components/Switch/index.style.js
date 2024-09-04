import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { COLOR } from '@src/styles/color';

const StyledSwitch = styled(Switch)`
  width: 40px;
  height: 24px;
  border-radius: 15px 15px;
  padding: 0;
  display: flex;

  & .MuiSwitch-switchBase {
    padding: 2px;

    &.Mui-checked {
      transform: translateX(16px);
      color: ${COLOR.white};

      & + .MuiSwitch-track {
        opacity: 1;
        background-color: ${(props) => props.checkedColor || COLOR.primary};
        border: none;
      }
    }

    &.Mui-disabled {
      transform: translateX(16px);
      color: ${COLOR.white};

      & + .MuiSwitch-track {
        opacity: 0.5;
        border: none;
      }
    }
  }

  & .MuiSwitch-thumb {
    width: 20px;
    height: 20px;
  }

  & .MuiSwitch-track {
    border-radius: 26/2;
    opacity: 1;
    background-color: ${(props) => props.noneCheckedColor || COLOR.light};
  }

  &.MuiSwitch-track {
    opacity: 1;
  }
`;

export { StyledSwitch };
