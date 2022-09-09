import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

export const ProfileIcon = ({isActive}) => {
    return (
        <Svg
            width={30}
            height={30}
            viewBox="0 0 21 22"
            fill="none"
        >
            <Path
                d="M10.5 1.5C9.62335 1.49984 8.76633 1.74761 8.03735 2.21197C7.30837 2.67633 6.74017 3.33643 6.40461 4.10877C6.06905 4.88111 5.98121 5.731 6.1522 6.55095C6.32318 7.37091 6.74531 8.12409 7.3652 8.71523C7.98509 9.30638 8.77489 9.70894 9.6347 9.872C10.4945 10.0351 11.3857 9.95129 12.1956 9.63129C13.0055 9.31129 13.6977 8.76943 14.1846 8.07425C14.6716 7.37906 14.9314 6.56178 14.9312 5.72578C14.9299 4.60543 14.4626 3.53133 13.6319 2.73912C12.8011 1.94691 11.6748 1.50129 10.5 1.5ZM1.5 20.5H19.5C19.2805 18.369 18.2376 16.392 16.574 14.9538C14.9105 13.5155 12.7454 12.7189 10.5 12.7189C8.2546 12.7189 6.08949 13.5155 4.42597 14.9538C2.76244 16.392 1.71947 18.369 1.5 20.5Z"
                stroke="url(#paint0_linear_3503_850)"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_3503_850"
                    x1={19.5}
                    y1={8.35}
                    x2={0.605769}
                    y2={8.35}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor={isActive ? "#FFAA7A" : "#d3d3d3"} />
                    <Stop offset={0.505787} stopColor={isActive ? "#F8607A" : "#d3d3d3"} />
                    <Stop offset={1} stopColor={isActive ? "#EE0979" : "#d3d3d3"} />
                </LinearGradient>
            </Defs>
        </Svg>
    );
};
