import { Label } from "@/components/ui/label";
import { defimg } from "@/utils/resize-crop-image";
import { PropTypes } from "prop-types";

const FormImagePreview = (props) => {
  const { imgSrc, labelClass, imgClass, size, label } = props;
  return (
    <div className="flex flex-col gap-2">
      <Label className={labelClass}>{label}</Label>
      <img
        src={imgSrc || defimg}
        alt="picture preview"
        className={`w-[${size}px] rounded-xl shadow ${imgClass}`}
      />
    </div>
  );
};

FormImagePreview.propTypes = {
  imgSrc: PropTypes.string,
  labelClass: PropTypes.string,
  imgClass: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string,
};

FormImagePreview.defaultProps = {
  imgSrc: null,
  labelClass: "",
  imgClass: "",
  size: 250,
  label: "Picture Preview",
};

export default FormImagePreview;
