const Preferences = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.electron.setExpansion('classic')
            .then((res: any) => console.log('SET ', res))
            .catch((e: any) => {
              console.log('ERROR ', e)
            })
        }}
      >
        SET
      </button>
      <button
        onClick={() => {
          window.electron.getExpansion()
            .then((res: any) => console.log('ASSHOLE ', res))
            .catch((e: any) => {
              console.log('ERROR ', e)
            })
        }}
      >
        GET
      </button>
    </div>
  );
}

export default Preferences;
