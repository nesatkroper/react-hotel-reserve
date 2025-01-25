import { Label } from "@/components/ui/label";
import { defimg } from "@/utils/resize-crop-image";

const FormImagePreview = (props) => {
  const {
    imgSrc,
    labelClass,
    imgClass,
    size = 250,
    label = "Picture Preview",
  } = props;
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

export default FormImagePreview;
