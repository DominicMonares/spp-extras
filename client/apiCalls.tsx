import { url } from './config';
import { useAppDispatch } from './store/hooks';
import { updateCharacters } from './store/slices/characterSlice';
import type { SelectedExpansion } from "./store/types";

const dispatch = useAppDispatch();

export const getCharacters = async (expansion: SelectedExpansion) => {
  const expansionParams = new URLSearchParams({ expansion: expansion });

  await fetch(`${url}/characters/all?` + expansionParams)
    .then(res => res.json())
    .then(data => dispatch(updateCharacters(data)))
    .catch(err => console.log('API ERROR: ', err));
}
