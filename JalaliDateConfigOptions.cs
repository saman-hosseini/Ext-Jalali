using System.ComponentModel;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace Ext.Net
{
    public partial class JalaliDate
    {
        [Browsable(false)]
        [EditorBrowsable(EditorBrowsableState.Always)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [XmlIgnore]
        [JsonIgnore]
        public override ConfigOptionsCollection ConfigOptions
        {
            get
            {
                ConfigOptionsCollection list = base.ConfigOptions;

                return list;
            }
        }
    }
}
