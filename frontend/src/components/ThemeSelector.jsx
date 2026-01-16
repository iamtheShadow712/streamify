import { THEMES } from '../constants'
import useApp from '../store/useApp'
import { PaletteIcon } from 'lucide-react';

const ThemeSelector = () => {
    const { setTheme, theme } = useApp();
    const handleClick = (theme) => {
        setTheme(theme)
    }
    return (
        <div>
            <div className='dropdown dropdown-end'>
                <div tabIndex={0} role="button" className='btn m-1'>
                    <PaletteIcon className='size-6 text-base-content opacity-70 hover:opacity-100' />
                </div>
                <div
                    tabIndex={0}
                    className='dropdown-content menu bg-base-100 rounded-2xl shadow-2xl border-base-content/10 rounded-box z-1 w-56 max-h-50 backdrop-blur-lg overflow-y-auto'
                >
                    <div className='space-y-2'>
                        {THEMES.map(themeOption => (
                            <button onClick={() => handleClick(themeOption.name)} className={`flex items-center cursor-pointer  gap-2 px-2 py-1 rounded-lg w-full ${theme === themeOption.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"}`} key={`theme-${themeOption.name}`}>
                                <PaletteIcon />
                                <span className='font-medium'>{themeOption.label}</span>
                                <div className="ml-auto flex gap-1">
                                    {themeOption.colors.map((color, i) => (
                                        <span
                                            key={i}
                                            className="size-2 rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ThemeSelector