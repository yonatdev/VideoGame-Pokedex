
export const useModalGame = () => {
  const reniciar = () => {
    location.reload();
  };

  return {
    reniciar,
  };
};
